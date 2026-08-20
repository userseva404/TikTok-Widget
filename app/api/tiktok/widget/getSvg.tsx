"use server";
import { IWidgetParams, Widget } from "@/components/Widget";
import { IWidget } from "../data/route";
import { Svg } from "@/components/Svg";
import { readFileSync } from "fs";
import path from "path";

const cssPath = path.join(process.cwd(), "src", "style", "index.css");

export async function getSvg(widget: IWidget, params: IWidgetParams) {
  const { renderToStaticMarkup } = await import("react-dom/server");

  const styles = readFileSync(cssPath, "utf8");
  const {
    stats = false,
    description = false,
    small = "default",
    videoPartAnim = false,
  } = params;
  const safeParams = {
    stats,
    description,
    small,
    videoPartAnim,
  };
  const svg = renderToStaticMarkup(
    <Svg params={safeParams} styles={styles}>
      <Widget user={widget.user} videos={widget.videos} params={safeParams} />
    </Svg>,
  );
  const cleanSvg = svg.substring(svg.indexOf("<svg"));

  return cleanSvg;
}
