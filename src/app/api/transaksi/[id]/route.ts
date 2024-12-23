import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Penyewa from "@/lib/models/penyewa";
import Transaksi from "@/lib/models/transaksi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  try {
    const offset = (page - 1) * limit;

    const dataPenyewa = await Transaksi.findAll();
    const dataBangunan = await Transaksi.findAll();
    const dataKamar = await Transaksi.findAll();
    const data = await Transaksi.findAndCountAll({
      where: {
        penyewa: id,
      },
      limit,
      offset,
      order: [["id", "DESC"]],
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
      { error: "Error fetching transaksi" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { penyewa, bangunan, kamar, nominal, tgl_pembayaran } =
    await request.json();

  try {
    const data = await Transaksi.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Transaksi not found" },
        { status: 404 }
      );
    }

    data.penyewa = penyewa || data.penyewa;
    data.bangunan = bangunan || data.bangunan;
    data.kamar = kamar || data.kamar;
    data.nominal = nominal || data.nominal;
    data.tgl_pembayaran = tgl_pembayaran || data.tgl_pembayaran;

    await data.save();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating transaksi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Transaksi.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Transaksi not found" },
        { status: 404 }
      );
    }

    await data.destroy();
    return NextResponse.json({ message: "Transaksi deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting transaksi" },
      { status: 500 }
    );
  }
}
