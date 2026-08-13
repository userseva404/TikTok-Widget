"use server";

import { createClientServer } from "@/utils/supabase/server";
import { ITikTokVideo, IWidget } from "../data/route";
import { validateToken } from "./validateToken";
import { ApiError } from "@/lib/ApiError";
import { requestUserInfo } from "./requestUserInfo";
import { requestUserVideos } from "./requestUserVideos";
import { toBase64 } from "@/utils/toBase64";

export async function getTikTokUserInfo(
  id: string = "28298d1f-8e5a-492f-8833-5b74a6293228",
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

  const [userData, videoData] = await Promise.all([
    requestUserInfo(access_token),
    requestUserVideos(access_token),
  ]);

  const base64Avatar = await toBase64(userData.user.avatar_large_url);

  const result: IWidget = {
    user: {
      ...userData.user,
      avatar_large_url: base64Avatar,
    },
    videos: [...videoData.videos, ...premade],
  };

  return result;
}

const one: ITikTokVideo = {
  share_count: 3,
  view_count: 48134,
  like_count: 2200,
  duration: 66,
  embed_html:
    '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@gromovick_/video/7141376929814285573?utm_campaign=tt4d_open_api&utm_source=sbawf13qub01myzqh6" data-video-id="7141376929814285573" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@gromovick_" href="https://www.tiktok.com/@gromovick_">@gromovick_</a> <p><a title="1" target="_blank" href="https://www.tiktok.com/tag/1">#1</a> <a title="блоксфрутс" target="_blank" href="https://www.tiktok.com/tag/%D0%B1%D0%BB%D0%BE%D0%BA%D1%81%D1%84%D1%80%D1%83%D1%82%D1%81">#блоксфрутс</a> <a title="bloxfruits" target="_blank" href="https://www.tiktok.com/tag/bloxfruits">#bloxfruits</a> <a title="onepiecefan" target="_blank" href="https://www.tiktok.com/tag/onepiecefan">#onepiecefan</a> <a title="ванпіс" target="_blank" href="https://www.tiktok.com/tag/%D0%B2%D0%B0%D0%BD%D0%BF%D1%96%D1%81">#ванпіс</a> <a title="фрукт" target="_blank" href="https://www.tiktok.com/tag/%D1%84%D1%80%D1%83%D0%BA%D1%82">#фрукт</a> <a title="fruit" target="_blank" href="https://www.tiktok.com/tag/fruit">#fruit</a> <a title="топодин" target="_blank" href="https://www.tiktok.com/tag/%D1%82%D0%BE%D0%BF%D0%BE%D0%B4%D0%B8%D0%BD">#топодин</a> <a title="топ" target="_blank" href="https://www.tiktok.com/tag/%D1%82%D0%BE%D0%BF">#топ</a> <a title="one" target="_blank" href="https://www.tiktok.com/tag/one">#one</a> <a title="рекомендації" target="_blank" href="https://www.tiktok.com/tag/%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D1%96%D1%97">#рекомендації</a> <a title="рек" target="_blank" href="https://www.tiktok.com/tag/%D1%80%D0%B5%D0%BA">#рек</a> <a title="славаукраїні" target="_blank" href="https://www.tiktok.com/tag/%D1%81%D0%BB%D0%B0%D0%B2%D0%B0%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96">#славаукраїні</a> <a title="длятебе" target="_blank" href="https://www.tiktok.com/tag/%D0%B4%D0%BB%D1%8F%D1%82%D0%B5%D0%B1%D0%B5">#длятебе</a> <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou">#foryou</a> <a title="роблокс" target="_blank" href="https://www.tiktok.com/tag/%D1%80%D0%BE%D0%B1%D0%BB%D0%BE%D0%BA%D1%81">#роблокс</a> <a title="roblox" target="_blank" href="https://www.tiktok.com/tag/roblox">#roblox</a> <a title="anime" target="_blank" href="https://www.tiktok.com/tag/anime">#anime</a> <a title="аніме" target="_blank" href="https://www.tiktok.com/tag/%D0%B0%D0%BD%D1%96%D0%BC%D0%B5">#аніме</a> </p> <a target="_blank" title="♬ One Piece - YungLex" href="https://www.tiktok.com/music/6889366596582656001-One+Piece">♬ One Piece - YungLex</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
  embed_link:
    "https://www.tiktok.com/player/v1/7141376929814285573?music_info=1&description=1&autoplay=1&loop=1&utm_campaign=tt4d_open_api&utm_source=sbawf13qub01myzqh6",
  id: "7141376929814285573",
  share_url:
    "https://www.tiktok.com/@gromovick_/video/7141376929814285573?utm_campaign=tt4d_open_api&utm_source=sbawf13qub01myzqh6",
  title:
    "#1 #блоксфрутс #bloxfruits #onepiecefan #ванпіс #фрукт #fruit #топодин #топ #one #рекомендації #рек #славаукраїні #длятебе #foryou #роблокс #roblox #anime #аніме ",
  cover_image_url:
    "https://p16-common-sign.tiktokcdn.com/tos-maliva-p-0068/16a68cf91a1e4892b1aa727437785901~tplv-tiktokx-cropcenter-q:300:400:q70.webp?dr=14782&refresh_token=f8b9eb8e&x-expires=1785592800&x-signature=PqkTzIcackXCQp4UH%2BlGJpSTbQo%3D&t=bacd0480&ps=933b5bde&shp=d05b14bd&shcp=8aecc5ac&idc=my2&biz_tag=tt_video&s=TIKTOK_FOR_DEVELOPER&sc=cover",
  width: 300,
  height: 400,
};

const premade = Array(10)
  .fill(0)
  .map(() => {
    return one;
  });
