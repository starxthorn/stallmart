import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectdb } from "@/utils/database";
import User from "@/models/User";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
    }),
    CredentialsProvider({
      name: "stallmart",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        await connectdb();
        const user = await User.findOne({ email: credentials?.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.role = user.role?.toString();
      } else {
        // Fetch user from database if not already included
        await connectdb();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token._id = dbUser._id?.toString();
          token.role = dbUser.role;
        }
      }
      // console.log("JWT token:", token); // Debugging line
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      // console.log("Session object:", session); // Debugging line
      return session;
    },
    async signIn({ user, account }) {
      try {
        await connectdb();
        let dbUser = await User.findOne({ email: user?.email });
        if (!dbUser) {
          dbUser = await User.create({
            avatar: user?.image,
            name: user?.name,
            email: user?.email,
            role: "user", // Default role, adjust as needed
          });
        } else if (account?.provider === "google") {
          dbUser.name = user.name;
          dbUser.email = user.email;
          dbUser.avatar = user.image;
          await dbUser.save();
        }
        // console.log("SignIn user:", dbUser); // Debugging line
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
