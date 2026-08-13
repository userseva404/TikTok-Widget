import { NextRequest, NextResponse } from "next/server";
import { IWidgetParams } from "@/components/Widget";
import { getTikTokUserInfo } from "../widget/getTikTokUserInfo";

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
  | "video_count";
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
  embed_html: string;
  embed_link: string;
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
    const {
      id = "28298d1f-8e5a-492f-8833-5b74a6293228",
      description = false,
      small = false,
      stats = false,
      videoPartAnim = false,
    } = params;

    if (!id) {
      return;
    }
    const res = await getTikTokUserInfo(id);
    return NextResponse.json(res);
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "An unexpected error occurred";
    return NextResponse.json({ message }, { status });
  }
}
