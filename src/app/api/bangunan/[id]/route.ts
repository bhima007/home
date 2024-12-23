import { NextResponse } from "next/server";
import Bangunan from "@/lib/models/bangunan";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Bangunan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Bangunan not found" },
        { status: 404 }
      );
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

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { lokasi, bangunan, alamat } = await request.json();

  try {
    const data = await Bangunan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Bangunan not found" },
        { status: 404 }
      );
    }

    data.lokasi = lokasi || data.lokasi;
    data.bangunan = bangunan || data.bangunan;
    data.alamat = alamat || data.alamat;

    await data.save();
    return NextResponse.json(bangunan);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating bangunan" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Bangunan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Bangunan not found" },
        { status: 404 }
      );
    }

    await data.destroy();
    return NextResponse.json({ message: "Bangunan deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting bangunan" },
      { status: 500 }
    );
  }
}
