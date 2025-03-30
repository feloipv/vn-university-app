import { verifyOtpSchema } from "@/schemas/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const activateUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/activate_user`;

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { data, error } = verifyOtpSchema.safeParse(requestBody);

    const apiResponse = await axios.post(activateUrl, data, {
      withCredentials: true,
    });

    const response = NextResponse.json(data);

    const setCookieHeader = apiResponse.headers["set-cookie"];
    if (setCookieHeader) {
      response.headers.append("Set-Cookie", setCookieHeader.join("; "));
    }

    return response;
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || "Lỗi máy chủ" },
        { status: error.response.status }
      );
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
