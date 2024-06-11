/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure remote image domains
    domains: [
      "api.dicebear.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "w7.pngwing.com",
    ],
  },
};

export default nextConfig;
