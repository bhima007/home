import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Penyewa from "@/lib/models/penyewa";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data penyewa
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
    const dataKamar = await Kamar.findAll();
    const data = await Penyewa.findAndCountAll({
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
          kamar: dataKamar.filter((K) => {
            return K.id == r.dataValues.kamar;
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
      { error: "Error fetching penyewa" },
      { status: 500 }
    );
  }
}

// Menangani permintaan POST untuk menambah data penyewa
export async function POST(request: Request) {
  try {
    const { nama, bangunan, kamar, tgl_masuk } = await request.json();
    const data = await Penyewa.create({ nama, bangunan, kamar, tgl_masuk });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating penyewa" },
      { status: 500 }
    );
  }
}
