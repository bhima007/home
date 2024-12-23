import Bangunan from "@/lib/models/bangunan";
import Pengumuman from "@/lib/models/pengumuman";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be greater than 0" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const dataBangunan = await Bangunan.findAll();
    const data = await Pengumuman.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });
    return NextResponse.json({
      data: data.rows.map((r) => {
        return {
          ...r.dataValues,
          bangunan: dataBangunan.filter((B) => {
            return B.id == r.dataValues.bangunan;
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
      { error: "Error fetching pengaduan" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { bangunan, pengumuman } = await request.json();
    const data = await Pengumuman.create({
      bangunan,
      pengumuman,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating pengaduan" },
      { status: 500 }
    );
  }
}
