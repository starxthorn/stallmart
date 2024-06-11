import { connectdb } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectdb();
  try {
    const { name, email, password } = await req.json();
    const Existuser = await User.findOne({ email });
    if (Existuser) {
      return NextResponse.json(
        {
          message: "User is already exists",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      {
        message: "User created",
        response: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
