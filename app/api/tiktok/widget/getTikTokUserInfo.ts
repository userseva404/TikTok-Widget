"use server";

import { createClientServer } from "@/utils/supabase/server";
import { ITikTokUserInfo, ITikTokVideo, IWidget } from "../data/route";
import { validateToken } from "./validateToken";
import { ApiError } from "@/lib/ApiError";
import { requestUserInfo } from "./requestUserInfo";
import { requestUserVideos } from "./requestUserVideos";
import { toBase64 } from "@/utils/toBase64";
import { IWidgetParams } from "@/components/Widget";

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

  const expires_at =
    new Date(data.created_at).getTime() + data.access_expires_in * 1000;

  let access_token = data.access_token;

  if (Date.now() + 300000 > expires_at) {
    const tokenData = await validateToken(data);
    access_token = tokenData.access_token;
    await client
      .from("connections")
      .update({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        created_at: `${Date.now()}`,
        refresh_expires_in: tokenData.refresh_expires_in,
        access_expires_in: tokenData.expires_in,
      })
      .eq("user_id", id)
      .eq("provider", "tik_tok");
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
      [...videos, ...premade].map(async (video) => {
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

  return result;
}

const one: ITikTokVideo = {
  share_count: 3,
  view_count: 48134,
  like_count: 2200,
  duration: 66,
  id: "7141376929814285573",
  share_url:
    "https://www.tiktok.com/@gromovick_/video/7141376929814285573?utm_campaign=tt4d_open_api&utm_source=sbawf13qub01myzqh6",
  title:
    "#1 #блоксфрутс #bloxfruits #onepiecefan #ванпіс #фрукт #fruit #топодин #топ #one #рекомендації #рек #славаукраїні #длятебе #foryou #роблокс #roblox #anime #аніме ",
  cover_image_url:
    "https://fastly.picsum.photos/id/403/300/400.jpg?hmac=Szm9yOaq-fxl0YqA8gt-jLNrWXa89WW6dYLizTV1k4k",
  width: 300,
  height: 400,
};

const premade = Array(10)
  .fill(0)
  .map(() => {
    return one;
  });
