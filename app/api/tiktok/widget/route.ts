import { NextRequest, NextResponse } from "next/server";

import { getSvg } from "./getSvg";

import { getTikTokUserInfo } from "./getTikTokUserInfo";
import { IWidget } from "../data/route";

export async function GET(request: NextRequest) {
  try {
    const userInfo = (await getTikTokUserInfo()) as IWidget;
    if (!userInfo) {
      return;
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
    return new NextResponse(error);
  }
}
