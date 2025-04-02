import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateData } from "@/schemas/validate";
import { cookieSchema } from "@/lib/setCookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, value } = validateData(cookieSchema, body);

    const cookieStore = await cookies();

    cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
