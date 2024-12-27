import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const role = url.searchParams.get("role");

    let data;
    if (role) {
      data = await User.findAll({
        where: {
          role,
        },
      });
    } else {
      data = await User.findAll({});
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
