import { NextResponse } from "next/server";
import Bangunan from "../../../../lib/models/bangunan";

export async function GET(request: Request) {
  try {
    const data = await Bangunan.findAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
