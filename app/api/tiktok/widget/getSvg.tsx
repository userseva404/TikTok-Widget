"use server";
import { Widget } from "@/components/Widget";
import { IWidget } from "../data/route";
import { Svg } from "@/components/Svg";
import { readFileSync } from "fs";

export async function getSvg(widget: IWidget) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const styles = readFileSync(
    "S:/Projects/tiktok-widget/src/style/index.css",
    "utf8",
  );

  const svg = renderToStaticMarkup(
    <Svg params={{}} styles={styles}>
      <Widget user={widget.user} videos={widget.videos} params={{}} />
    </Svg>,
  );
  const cleanSvg = svg.substring(svg.indexOf("<svg"));

  return cleanSvg;
}
