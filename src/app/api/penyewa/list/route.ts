import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Penyewa from "@/lib/models/penyewa";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

// Menangani permintaan GET untuk mendapatkan data pengguna
export async function GET() {
  try {
    const data = await Penyewa.findAll();

    const dataUser = await User.findAll();
    const dataBangunan = await Bangunan.findAll();
    const dataKamar = await Kamar.findAll();
    return NextResponse.json({  data: data.map((r) => {
      return {
        ...r.dataValues,
        nama: dataUser.filter((B) => {
          return B.id == r.dataValues.nama;
        })[0],
        bangunan: dataBangunan.filter((B) => {
          return B.id == r.dataValues.bangunan;
        })[0],
        kamar: dataKamar.filter((K) => {
          return K.id == r.dataValues.kamar;
        })[0],
      };
    }),});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching bangunan" },
      { status: 500 }
    );
  }
}
