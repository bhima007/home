import Kamar from "@/lib/models/kamar";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10); // Ambil ID dari URL

  try {
    const data = await Kamar.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Kamar not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching kamar" }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10); // Ambil ID dari URL
  const { bangunan, kamar } = await request.json();

  try {
    const data = await Kamar.findByPk(id);
    if (!data) {
      return NextResponse.json({ error: 'Kamar not found' }, { status: 404 });
    }

    // Update kamar
    data.bangunan = bangunan || data.bangunan;
    data.kamar = kamar || data.kamar;

    await data.save();
    return NextResponse.json(kamar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating kamar' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Kamar.findByPk(id);
    if (!data) {
      return NextResponse.json({ error: 'Kamar not found' }, { status: 404 });
    }

    await data.destroy();
    return NextResponse.json({ message: 'Kamar deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting kamar' }, { status: 500 });
  }
}
