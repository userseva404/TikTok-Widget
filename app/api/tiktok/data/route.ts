import { NextRequest, NextResponse } from "next/server";
import { IWidgetParams } from "@/components/Widget";
import { getTikTokUserInfo } from "../widget/getTikTokUserInfo";
import { ApiError } from "@/lib/ApiError";

export type TiktokUserInfoParams =
  | "avatar_large_url"
  | "display_name"
  | "bio_description"
  | "profile_deep_link"
  | "is_verified"
  | "username"
  | "follower_count"
  | "following_count"
  | "likes_count"
  | "video_count"
  | "avatar_url";
export type TiktokUserVideoParams =
  | "id"
  | "create_time"
  | "cover_image_url"
  | "share_url"
  | "video_description"
  | "duration"
  | "height"
  | "width"
  | "title"
  | "embed_html"
  | "embed_link"
  | "like_count"
  | "comment_count"
  | "share_count"
  | "view_count";

export interface ITikTokUserInfo {
  avatar_large_url: string;
  avatar_url: string;
  display_name: string;
  bio_description: string;
  profile_deep_link: string;
  is_verified: boolean;
  username: string;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
}

export interface ITikTokVideo {
  cover_image_url: string;
  duration: number;
  id: string;
  like_count: number;
  share_count: number;
  share_url: string;
  title: string;
  view_count: number;
  width: number;
  height: number;
}

export interface ITikTokRes {
  data: {
    user: ITikTokUserInfo;
  };
}

export interface ITikTokVideoRes {
  data: {
    videos: ITikTokVideo[];
  };
}

export interface IWidget {
  user: ITikTokUserInfo;
  videos: ITikTokVideo[];
}

interface RouteParams extends IWidgetParams {
  id?: string;
}

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(
      request.nextUrl.searchParams,
    ) as RouteParams;
    const { id = "28298d1f-8e5a-492f-8833-5b74a6293228" } = params;

    if (!id) {
      return;
    }
    const res = await getTikTokUserInfo(id, params);
    return NextResponse.json(res);
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
