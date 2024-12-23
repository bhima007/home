import Peraturan from "@/lib/models/peraturan";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Peraturan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Peraturan not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching peraturan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);
  const { aturan, bangunan } = await request.json();

  try {
    const data = await Peraturan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Peraturan not found" },
        { status: 404 }
      );
    }

    data.bangunan = bangunan || data.bangunan;
    data.aturan = aturan || data.aturan;

    await data.save();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating peraturan" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "", 10);

  try {
    const data = await Peraturan.findByPk(id);
    if (!data) {
      return NextResponse.json(
        { error: "Peraturan not found" },
        { status: 404 }
      );
    }

    await data.destroy();
    return NextResponse.json({ message: "Peraturan deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting peraturan" },
      { status: 500 }
    );
  }
}
