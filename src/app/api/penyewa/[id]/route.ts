import Bangunan from "@/lib/models/bangunan";
import Kamar from "@/lib/models/kamar";
import Penyewa from "@/lib/models/penyewa";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Penyewa.findByPk(id);
    if (!data) {
      return NextResponse.json({ error: "Penyewa not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching penyewa" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { nama, bangunan, kamar, tgl_masuk } = await request.json();

  try {
    const data = await Penyewa.findByPk(id);
    if (!data) {
      return NextResponse.json({ error: "Penyewa not found" }, { status: 404 });
    }

    data.nama = nama || data.nama;
    data.bangunan = bangunan || data.bangunan;
    data.kamar = kamar || data.kamar;
    data.tgl_masuk = tgl_masuk || data.tgl_masuk;

    await data.save();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating penyewa" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Penyewa.findByPk(id);
    if (!data) {
      return NextResponse.json({ error: "Penyewa not found" }, { status: 404 });
    }

    await data.destroy();
    return NextResponse.json({ message: "Penyewa deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting penyewa" },
      { status: 500 }
    );
  }
}
