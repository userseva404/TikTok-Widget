import { NextRequest, NextResponse } from "next/server";

import { getSvg } from "./getSvg";

import { getTikTokUserInfo } from "./getTikTokUserInfo";
import { IWidget } from "../data/route";
import { ApiError } from "@/lib/ApiError";

export async function GET(request: NextRequest) {
  try {
    const userInfo = (await getTikTokUserInfo()) as IWidget;
    if (!userInfo) {
      throw new ApiError("User info not found", 404);
    }
    const svg = await getSvg(userInfo);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    let status = 500;
    let message = "An unexpected error occurred";
    if (error instanceof ApiError) {
      status = error.status;
      message = error.message;
    }
    return NextResponse.json({ message }, { status });
  }
}
