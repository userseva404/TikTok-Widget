import { ITikTokVideo } from "../../../app/api/tiktok/data/route";
import { VideoGrid } from "../features/VideoGrid";
import { VideoTabs } from "../ui/VideoTabs";
import { AnimationVideoGrid } from "./AnimationVideoGrid";

interface Props {
  videos: ITikTokVideo[];
  videoPartAnim?: boolean;
}

export function WidgetVideoPart({ videos, videoPartAnim = false }: Props) {
  const renderGrid = () => {
    if (videoPartAnim) {
      return <AnimationVideoGrid videos={videos} reposts={videos} />;
    } else {
      return <VideoGrid videos={videos} />;
    }
  };

  return (
    <div className="video__part" data-anim={videoPartAnim ? "anim" : ""}>
      <VideoTabs />
      {renderGrid()}
    </div>
  );
}
