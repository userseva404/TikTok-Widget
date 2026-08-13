import { ITikTokVideo } from "../../../app/api/tiktok/data/route";
import { Video } from "../ui/Video";

interface Props {
  videos: ITikTokVideo[];
}

export function VideoGrid({ videos }: Props) {
  return (
    <div className="videoGrid">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </div>
  );
}
