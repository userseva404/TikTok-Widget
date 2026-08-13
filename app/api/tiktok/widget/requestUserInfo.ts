import { ITikTokRes, TiktokUserInfoParams } from "../data/route";

export async function requestUserInfo(access_token: string) {
  const queryFields: TiktokUserInfoParams[] = [
    "avatar_large_url",
    "display_name",
    "bio_description",
    "profile_deep_link",
    "is_verified",
    "username",
    "follower_count",
    "following_count",
    "likes_count",
    "video_count",
  ];

  const queryParamsStr = new URLSearchParams({
    fields: queryFields.join(","),
  }).toString();

  const userRes = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?${queryParamsStr}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  const { data: userData } = (await userRes.json()) as ITikTokRes;
  return userData;
}
