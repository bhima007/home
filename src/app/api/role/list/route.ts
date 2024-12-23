import { NextResponse } from "next/server";
import Role from "@/lib/models/role";

export async function GET() {
  try {
    const data = await Role.findAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
