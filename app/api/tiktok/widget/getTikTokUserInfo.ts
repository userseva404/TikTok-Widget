"use server";

import { createClientServer } from "@/utils/supabase/server";
import { ITikTokUserInfo, ITikTokVideo, IWidget } from "../data/route";
import { validateToken } from "./validateToken";
import { ApiError } from "@/lib/ApiError";
import { requestUserInfo } from "./requestUserInfo";
import { requestUserVideos } from "./requestUserVideos";
import { toBase64 } from "@/utils/toBase64";
import { IWidgetParams } from "@/components/Widget";
import { calcExpire } from "@/utils/calcExpire";
import { TikTokMock } from "@/utils/mock/TikTokMock";

export async function getTikTokUserInfo(
  id: string = "b51e2b33-a9fb-4796-b956-2905771875cf",
  params: IWidgetParams,
): Promise<IWidget | undefined> {
  const client = await createClientServer();

  if (!id) {
    throw new ApiError("No id provided", 400);
  }

  const { data } = await client
    .from("connections")
    .select("*")
    .eq("user_id", id)
    .eq("provider", "tik_tok")
    .single();

  if (!data) {
    throw new ApiError("User connection not found in database", 404);
  }

  if (!data.access_token) {
    throw new ApiError("TikTok access token is missing or expired", 401);
  }

  const expires_at = data.access_invalid_at;

  let access_token = data.access_token;
  const dateGap = new Date(Date.now() + 300000).toISOString();

  if (new Date(dateGap).getTime() > new Date(expires_at).getTime()) {
    if (
      new Date(dateGap).getTime() > new Date(data.refresh_invalid_at).getTime()
    ) {
      const { error } = await client
        .from("connections")
        .delete()
        .eq("provider", "tik_tok")
        .eq("user_id", id);
      if (error) {
        throw new ApiError("Unable to delete invalid connection", 500);
      }
      throw new ApiError("Connection expired, please reconnect TikTok", 401);
    }
    const tokenData = await validateToken(data);
    if (!tokenData.access_token) {
      throw new ApiError("Access token revalidation error", 500);
    }
    access_token = tokenData.access_token;
    const refresh_invalid_at = calcExpire(tokenData.refresh_expires_in);
    const access_invalid_at = calcExpire(tokenData.expires_in);
    const { error } = await client
      .from("connections")
      .update({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        refresh_expires_in: tokenData.refresh_expires_in,
        access_expires_in: tokenData.expires_in,
        refresh_invalid_at,
        access_invalid_at,
      })
      .eq("user_id", id)
      .eq("provider", "tik_tok");

    if (error) {
      throw new ApiError("Unable to update tokens", 500);
    }
  }

  // User here

  const userInfoWithImg = async (): Promise<ITikTokUserInfo> => {
    const { user } = await requestUserInfo(access_token);
    const base64Avatar = await toBase64(user.avatar_url);
    return {
      ...user,
      avatar_large_url: base64Avatar,
    };
  };

  const videoInfoWithImg = async (): Promise<ITikTokVideo[]> => {
    const { videos } = await requestUserVideos(access_token);
    const base64Videos = await Promise.all(
      [...videos].map(async (video) => {
        const img = await toBase64(video.cover_image_url);
        return {
          ...video,
          cover_image_url: img,
        };
      }),
    );
    return base64Videos;
  };

  const [user, videos] = await Promise.all([
    userInfoWithImg(),
    !params.small ? videoInfoWithImg() : [],
  ]);

  const result: IWidget = {
    user: user,
    videos: [...videos],
  };

  if (process.env.NODE_ENV === "development") {
    result.videos = [...result.videos, ...TikTokMock.generateVideos()];
  }

  return result;
}
