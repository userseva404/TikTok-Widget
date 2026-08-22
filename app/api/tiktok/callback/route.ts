import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClientServer } from "@/utils/supabase/server";
import { calcExpire } from "@/utils/calcExpire";
import { ApiError } from "@/lib/ApiError";

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
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const cook = await cookies();
    const origin = request.nextUrl.origin;
    const client = await createClientServer();

    const { data: alreadyConnected } = await client
      .from("connections")
      .select()
      .eq("provider", "tik_tok");

    if (alreadyConnected) {
      throw new ApiError(
        "TikTok provider is already connected to your account",
        401,
      );
    }

    if (!code && !error) {
      const csrfState = crypto.randomUUID();

      cook.set("csrfState", csrfState, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 160,
      });

      const params = new URLSearchParams({
        client_key: process.env.TIK_TOK_CLIENT_KEY || "",
        scope: "user.info.basic,user.info.profile,user.info.stats,video.list",
        response_type: "code",
        redirect_uri:
          process.env.NEXT_PUBLIC_ORIGIN_URL + "/api/tiktok/callback" || "",
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
          redirect_uri:
            process.env.NEXT_PUBLIC_ORIGIN_URL + "/api/tiktok/callback" || "",
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

    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      console.error(
        "No active session. User must be logged in to connect TikTok.",
      );
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_ORIGIN_URL || origin,
      );
    }

    const refresh_invalid_at = calcExpire(tokenData.refresh_expires_in);
    const access_invalid_at = calcExpire(tokenData.expires_in);

    const { error: dbError } = await client.from("connections").upsert(
      {
        user_id: user.id,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        access_expires_in: tokenData.expires_in,
        refresh_expires_in: tokenData.refresh_expires_in,
        refresh_invalid_at: refresh_invalid_at,
        access_invalid_at: access_invalid_at,
        provider: "tik_tok",
        api_id: open_id,
      },
      {
        onConflict: "user_id, provider",
      },
    );

    if (dbError) {
      console.error("Database connection save error:", dbError);
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_ORIGIN_URL || origin,
      );
    }

    return NextResponse.redirect(process.env.NEXT_PUBLIC_ORIGIN_URL || origin);
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
