import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Pengaduan from "@/lib/models/pengaduan";
import Pengumuman from "@/lib/models/pengumuman";
import Penyewa from "@/lib/models/penyewa";
import Peraturan from "@/lib/models/peraturan";
import Transaksi from "@/lib/models/transaksi";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data dashboard
export async function GET() {
  try {
    const dataBangunan = await Bangunan.count();
    const dataKamar = await Kamar.count();
    const dataPenyewa = await Penyewa.count();
    const dataTransaksi = await Transaksi.count();
    const dataPengaduan = await Pengaduan.count();
    const dataPeraturan = await Peraturan.count();
    const dataPengumuman = await Pengumuman.count();

    return NextResponse.json({
      data: {
        dataBangunan,
        dataKamar,
        dataPenyewa,
        dataTransaksi,
        dataPengaduan,
        dataPeraturan,
        dataPengumuman,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
