import Penyewa from "@/lib/models/penyewa";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data pengguna
export async function GET() {
  try {
    const data = await Penyewa.findAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
