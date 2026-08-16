import { ITikTokVideoRes, TiktokUserVideoParams } from "../data/route";

export async function requestUserVideos(access_token: string) {
  const videoQueryParams: TiktokUserVideoParams[] = [
    "cover_image_url",
    "duration",
    "id",
    "like_count",
    "share_count",
    "share_url",
    "title",
    "view_count",
    "width",
    "height",
  ];

  const videoQueryParamsStr = new URLSearchParams({
    fields: videoQueryParams.join(","),
  }).toString();

  const userVideoRes = await fetch(
    `https://open.tiktokapis.com/v2/video/list/?${videoQueryParamsStr}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_count: 9,
      }),
    },
  );

  const { data: videoData } = (await userVideoRes.json()) as ITikTokVideoRes;
  return videoData;
}
