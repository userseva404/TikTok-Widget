"use server";

import { TConnection } from "@/types";
import { TikTokTokenResponse } from "../callback/route";
import { ApiError } from "@/lib/ApiError";

export async function validateToken(connection: TConnection) {
  const tokenResponse = await fetch(
    "https://open.tiktokapis.com/v2/oauth/token/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams({
        client_key: process.env.TIK_TOK_CLIENT_KEY || "",
        client_secret: process.env.TIK_TOK_CLIENT_SECRET || "",
        grant_type: "refresh_token", //
        refresh_token: connection.refresh_token,
      }).toString(),
    },
  );

  if (!tokenResponse.ok) {
    throw new ApiError("Token revalidation error", 500);
  }

  const tokenData = (await tokenResponse.json()) as TikTokTokenResponse;

  return tokenData;
}
