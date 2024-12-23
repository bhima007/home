import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Penyewa from "@/lib/models/penyewa";
import Transaksi from "@/lib/models/transaksi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("penyewaId") || "1", 10);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be greater than 0" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const dataPenyewa = await Penyewa.findAll();
    const dataBangunan = await Bangunan.findAll();
    const dataKamar = await Kamar.findAll();
    const data = await Transaksi.findAndCountAll({
      where: {
        penyewa: id,
      },
      limit,
      offset,
      order: [["id", "ASC"]],
    });
    return NextResponse.json({
      data: data.rows.map((r) => {
        return {
          ...r.dataValues,
          penyewa: dataPenyewa.filter((P) => {
            return P.id == r.dataValues.penyewa;
          })[0],
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

export async function POST(request: Request) {
  try {
    const { penyewa, bangunan, kamar, nominal, tgl_pembayaran } =
      await request.json();
    const data = await Transaksi.create({
      penyewa,
      bangunan,
      kamar,
      nominal,
      tgl_pembayaran,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating penyewa" },
      { status: 500 }
    );
  }
}
