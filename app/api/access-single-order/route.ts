import Order from "@/models/Order";
import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    const order = await Order.findOne({ _id: id })
      .populate("products.productId")
      .populate("user");
    return NextResponse.json(
      {
        response: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    let order = await Order.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json(
      {
        message: "User Updated",
        response: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    await Order.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Order deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
