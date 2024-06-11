import Product from "@/models/Product";
import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const id = req.nextUrl.searchParams.get("id");
  try {
    const single_product = await Product.findById(id);
    if (!single_product) {
      return NextResponse.json(
        {
          message: "Products not found",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        response: single_product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Product Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
