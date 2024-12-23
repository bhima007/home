import Kamar from "@/lib/models/kamar";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data pengguna
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const bangunanId = url.searchParams.get("bangunanId");

    let data = [];
    if (!bangunanId) {
      data = await Kamar.findAll();
    } else {
      data = await Kamar.findAll({
        where: {
          bangunan: bangunanId,
        },
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
