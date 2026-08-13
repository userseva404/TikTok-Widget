import { Svg } from "../Svg";
import { Widget } from "../Widget";
import { IWidget } from "../../../app/api/tiktok/data/route";
import { useTikTokWidgetParams } from "@/store/useTikTokWidgetParams";

interface Props {
  data: IWidget;
}

export function TikTokPreview({ data }: Props) {
  const { params } = useTikTokWidgetParams();

  return (
    <Svg params={params} className="w-full" front>
      <Widget params={params} user={data.user} videos={data.videos} />
    </Svg>
  );
}
