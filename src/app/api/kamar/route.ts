import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data pengguna
export async function GET(request: Request) {
  try {
    // Ambil parameter page dan limit dari query string
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default halaman 1
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default limit 10

    // Validasi halaman dan limit
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be greater than 0" },
        { status: 400 }
      );
    }

    // Hitung offset berdasarkan page dan limit
    const offset = (page - 1) * limit;

    const dataBangunan = await Bangunan.findAll();

    const data = await Kamar.findAndCountAll({
      limit, // Batasi jumlah hasil
      offset, // Tentukan offset berdasarkan halaman
      order: [["id", "ASC"]], // Urutkan berdasarkan ID atau sesuai kebutuhan
    });
    return NextResponse.json({
      data: data.rows.map((r) => {
        return {
          ...r.dataValues,
          bangunan: dataBangunan.filter((B) => {
            return B.id == r.dataValues.bangunan;
          })[0],
        };
      }),
      total: data.count,
      page,
      limit,
      totalPages: Math.ceil(data.count / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}

// Menangani permintaan POST untuk menambah data kamar
export async function POST(request: Request) {
  try {
    const { bangunan, kamar } = await request.json();
    const data = await Kamar.create({ bangunan, kamar });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating bangunan" },
      { status: 500 }
    );
  }
}
