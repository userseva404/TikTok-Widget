"use client";

import { IWidgetParams, Widget } from "@/components/Widget";
import { useEffect, useState } from "react";
import {
  ITikTokUserInfo,
  ITikTokVideo,
  IWidget,
} from "../api/tiktok/data/route";
import { Svg } from "@/components/Svg";

export default function Test() {
  const [user, setUser] = useState<ITikTokUserInfo | null>(null);
  const [videos, setVideos] = useState<ITikTokVideo[] | null>(null);
  useEffect(() => {
    const fetchTikTokUser = async () => {
      const res = await fetch(
        "https://d6xfx6ln-3000.euw.devtunnels.ms/api/tiktok/data",
      );
      const data = (await res.json()) as IWidget;
      setUser(data.user);
      setVideos(data.videos);
    };
    fetchTikTokUser();
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  if (!user || !videos) {
    return;
  }

  const params: IWidgetParams = {
    // small: true,
    stats: true,
    description: true,
    videoPartAnim: true,
  };

  return (
    <Svg params={params}>
      <Widget user={user} videos={videos} params={params} />;
    </Svg>
  );
}
