import User from "@/models/User";
import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  await connectdb();
  try {
    const current_user = await User.findOne({ email });
    return NextResponse.json(
      {
        response: current_user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
