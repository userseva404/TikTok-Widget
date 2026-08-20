import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClientServer } from "@/utils/supabase/server";

export interface TikTokTokenResponse {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface TikTokUserInfoResponse {
  data: {
    user: {
      avatar_url: string;
      display_name: string;
      open_id: string;
    };
  };
  error: {
    code: string;
    message: string;
    log_id: string;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const cook = await cookies();
  const origin = request.nextUrl.origin;

  if (!code && !error) {
    const csrfState = Math.random().toString(36).substring(2);

    cook.set("csrfState", csrfState, {
      httpOnly: true,
      secure: false,
      maxAge: 160,
    });

    const params = new URLSearchParams({
      client_key: process.env.TIK_TOK_CLIENT_KEY || "",
      scope: "user.info.basic,user.info.profile,user.info.stats,video.list",
      response_type: "code",
      redirect_uri: process.env.TIK_TOK_REDIRECT_URI || "",
      state: csrfState,
    });

    const url = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
    return Response.json({ url: url }, { status: 200 });
  }

  const returnedState = searchParams.get("state");
  const savedState = cook.get("csrfState")?.value;

  if (returnedState !== savedState) {
    return Response.json(
      { error: "State mismatch / CSRF attack detected" },
      { status: 400 },
    );
  }

  if (!code) {
    return;
  }

  try {
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
          code: code,
          grant_type: "authorization_code",
          redirect_uri: process.env.TIK_TOK_REDIRECT_URI || "",
        }).toString(),
      },
    );

    const tokenData = (await tokenResponse.json()) as TikTokTokenResponse;

    if (!tokenData.access_token) {
      console.error("TikTok Token Error:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=Failed+to+get+token`);
    }

    const userResponse = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const userData = (await userResponse.json()) as TikTokUserInfoResponse;

    if (userData.error?.code !== "ok") {
      console.error("TikTok User Info Error:", userData.error);
      return NextResponse.redirect(
        `${origin}/login?error=Failed+to+get+user+info`,
      );
    }

    const { open_id } = userData.data.user;

    const client = await createClientServer();
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      console.error(
        "No active session. User must be logged in to connect TikTok.",
      );
      return NextResponse.redirect(process.env.APP_DEFAULT_URL || origin);
    }
    const invalid_at_ms = Date.now() + tokenData.refresh_expires_in * 1000;
    const invalid_at = new Date(invalid_at_ms).toISOString();

    const { error: dbError } = await client.from("connections").upsert(
      {
        user_id: user.id,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        access_expires_in: tokenData.expires_in,
        refresh_expires_in: tokenData.refresh_expires_in,
        invalid_at,
        provider: "tik_tok",
        api_id: open_id,
      },
      {
        onConflict: "user_id, provider",
      },
    );

    if (dbError) {
      console.error("Database connection save error:", dbError);
      return NextResponse.redirect(process.env.APP_DEFAULT_URL || origin);
    }
    console.log("SUCCESS");

    return NextResponse.redirect(process.env.APP_DEFAULT_URL || origin);
  } catch (err) {
    console.error("Server side TikTok Auth Error:", err);
    return NextResponse.redirect(process.env.APP_DEFAULT_URL || origin);
  }
}
