import { formatNumber } from "@/utils/formatNumber";
import { ITikTokVideo } from "../../../app/api/tiktok/data/route";

interface Props {
  video: ITikTokVideo;
}

export function Video({ video }: Props) {
  const views = formatNumber(video.view_count);

  return (
    <div className="video">
      <img
        className="video__img"
        src={video.cover_image_url}
        alt=""
        onError={(e) => {
          e.currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4r2E-r6Zrlo57l5IyJ11YFj9KYzFq68uy91X9gA1O0Q&s=10";
        }}
      />
      <div className="video__info">
        <div className="video__views">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
          </svg>
          <p className="">{views}</p>
        </div>
      </div>
    </div>
  );
}
