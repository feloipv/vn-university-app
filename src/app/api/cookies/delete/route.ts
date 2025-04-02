import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateData } from "@/schemas/validate";
import { cookieSchema, deleteCookiesSchema } from "@/lib/setCookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = validateData(deleteCookiesSchema, body);

    const cookieStore = await cookies();
    cookieStore.delete(name);

    return NextResponse.json({ message: "Cookie deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
