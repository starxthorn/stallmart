import { connectdb } from "@/utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectdb();
  try {
    const AllUsers = await User.find();
    if (!AllUsers) {
      return NextResponse.json(
        {
          message: "There is no user",
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        response: AllUsers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
