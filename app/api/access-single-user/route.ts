import User from "@/models/User";
import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const id = req.nextUrl.searchParams.get("id");
  try {
    const user = await User.findById(id);
    return NextResponse.json(
      {
        response: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req: NextRequest) {
  await connectdb();
  const id = req.nextUrl.searchParams.get("id");
  try {
    let user = await User.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json(
      {
        message: "User Updated",
        response: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  await connectdb();
  const id = req.nextUrl.searchParams.get("id");
  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "user deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
