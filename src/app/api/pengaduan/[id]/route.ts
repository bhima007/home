import Pengaduan from "@/lib/models/pengaduan";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Pengaduan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengaduan not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching pengaduan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { nama, bangunan, kamar, pengaduan, status } = await request.json();

  try {
    const data = await Pengaduan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengaduan not found" },
        { status: 404 }
      );
    }

    data.nama = nama || data.nama;
    data.bangunan = bangunan || data.bangunan;
    data.kamar = kamar || data.kamar;
    data.pengaduan = pengaduan || data.pengaduan;
    data.status = status || data.status;

    await data.save();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating pengaduan" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Pengaduan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengaduan not found" },
        { status: 404 }
      );
    }

    await data.destroy();
    return NextResponse.json({ message: "Pengaduan deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting pengaduan" },
      { status: 500 }
    );
  }
}
