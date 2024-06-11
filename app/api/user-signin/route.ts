import { connectdb } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectdb();
  try {
    const { email, password } = await req.json();
    const ExitsUser = await User.findOne({ email });
    if (!ExitsUser) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        {
          status: 400,
        }
      );
    }
    const comparePassword = await bcrypt.compare(password, ExitsUser.password);
    if (!comparePassword) {
      return NextResponse.json(
        {
          message: "Email or Passoword is wrong",
        },
        {
          status: 400,
        }
      );
    }
    if (ExitsUser && comparePassword) {
      return NextResponse.json(
        {
          message: `${ExitsUser.name} logged in`,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
