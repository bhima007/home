
import Pengumuman from "@/lib/models/pengumuman";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Pengumuman.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengumuman not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching pengumuman" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { pengumuman, bangunan } = await request.json();

  try {
    const data = await Pengumuman.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengumuman not found" },
        { status: 404 }
      );
    }

    data.bangunan = bangunan || data.bangunan;
    data.pengumuman = pengumuman || data.pengumuman;

    await data.save();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating pengumuman" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Pengumuman.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Pengumuman not found" },
        { status: 404 }
      );
    }

    await data.destroy();
    return NextResponse.json({ message: "Pengumuman deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting pengumuman" },
      { status: 500 }
    );
  }
}
