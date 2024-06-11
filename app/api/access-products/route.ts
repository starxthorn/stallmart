import Product from "@/models/Product";
import { connectdb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectdb();
  try {
    const products = await Product.find();
    if (!products) {
      return NextResponse.json(
        {
          message: "No Product is listed",
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json({
      response: products,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  await connectdb();
  try {
    const { title, description, price, stock, category, images } =
      await req.json();
    const pro = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      images,
    });
    return NextResponse.json(
      {
        message: "Product Created",
        response: pro,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectdb();
  try {
    let pro = await Product.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json(
      {
        message: "Product Updated",
        response: pro,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
