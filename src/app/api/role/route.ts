import Role from "@/lib/models/role";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data role
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

    const data = await Role.findAndCountAll({
      limit, // Batasi jumlah hasil
      offset, // Tentukan offset berdasarkan halaman
      order: [["id", "ASC"]], // Urutkan berdasarkan ID atau sesuai kebutuhan
    });
    return NextResponse.json({
      data: data.rows,
      total: data.count,
      page,
      limit,
      totalPages: Math.ceil(data.count / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching role" },
      { status: 500 }
    );
  }
}

// Menangani permintaan POST untuk menambah data role
export async function POST(request: Request) {
  try {
    const { nama } = await request.json();
    const data = await Role.create({ nama });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating role" },
      { status: 500 }
    );
  }
}