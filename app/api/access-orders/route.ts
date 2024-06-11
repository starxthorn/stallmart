import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    const { products, totalPrice } = await req.json();
    const ExistUser = await User.findOne({ _id: id });
    const order = await Order.create({
      products,
      totalPrice,
      user: ExistUser._id,
    });
    ExistUser.orders.push(order);
    await ExistUser.save();
    return NextResponse.json(
      {
        message: "Order placed Successfully",
        response: order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    const orders = await Order.find().populate("user");
    await connectdb();
    if (!orders) {
      return NextResponse.json(
        {
          message: "No single order is placed yet",
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        response: orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
