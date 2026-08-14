import { NextRequest, NextResponse } from "next/server";

import { getSvg } from "./getSvg";

import { getTikTokUserInfo } from "./getTikTokUserInfo";
import { IWidget } from "../data/route";
import { ApiError } from "@/lib/ApiError";
import { IWidgetParams } from "@/components/Widget";

interface RouteParams extends IWidgetParams {
  id?: string;
}

const parseBool = (value?: string): boolean | undefined => {
  if (value === undefined) return undefined;
  return value === "true" || value === "1";
};

export async function GET(request: NextRequest) {
  try {
    const rawParams = Object.fromEntries(request.nextUrl.searchParams);

    const params: RouteParams = {
      id: rawParams.id,
      stats:
        rawParams.stats !== undefined ? parseBool(rawParams.stats) : undefined,
      description:
        rawParams.description !== undefined
          ? parseBool(rawParams.description)
          : undefined,
      videoPartAnim:
        rawParams.videoPartAnim !== undefined
          ? parseBool(rawParams.videoPartAnim)
          : undefined,
      small:
        rawParams.small !== undefined ? parseBool(rawParams.small) : undefined,
    };

    const { id } = params;

    const userInfo = (await getTikTokUserInfo(id, params)) as IWidget;
    if (!userInfo) {
      throw new ApiError("User info not found", 404);
    }
    const svg = await getSvg(userInfo, params);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "s-maxage=1, stale-while-revalidate",
      },
    });
  } catch (error) {
    let status = 500;
    let message = "An unexpected error occurred";
    if (error instanceof ApiError) {
      status = error.status;
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status });
  }
}
