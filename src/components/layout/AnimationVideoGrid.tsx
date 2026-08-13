import { ITikTokVideo } from "../../../app/api/tiktok/data/route";
import { VideoGrid } from "../features/VideoGrid";

interface Props {
  videos: ITikTokVideo[];
  reposts: ITikTokVideo[];
}

export function AnimationVideoGrid({ videos, reposts }: Props) {
  const repostsUpd = reposts.map(({ cover_image_url, ...video }) => {
    return {
      cover_image_url:
        "https://static.vecteezy.com/system/resources/thumbnails/074/403/401/small/a-red-rose-covered-in-snow-is-shown-in-this-photo.jpg",
      ...video,
    };
  });
  const videosUpd = reposts.map(({ cover_image_url, ...video }) => {
    return {
      cover_image_url:
        "https://cdn.dribbble.com/userupload/14512097/file/original-2446f51e211ae20184f0adcddfe49e9e.png?resize=420x&vertical=center",
      ...video,
    };
  });

  return (
    <div className="animation__video_grid">
      <VideoGrid videos={videosUpd} />
      <VideoGrid videos={repostsUpd} />
    </div>
  );
}
