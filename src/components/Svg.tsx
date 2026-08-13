import "../style/index.css";
import { IWidgetParams } from "./Widget";

interface Props {
  children: React.ReactNode;
  styles?: string;
  params: IWidgetParams;
  className?: string;
  front?: boolean;
}

const descH = 96;
const statsH = 92;

export function Svg({
  children,
  styles = "",
  params,
  className = "",
  front = false,
}: Props) {
  const safeStyles = `/*<![CDATA[*/\n${styles}\n/*]]>*/`;
  const smallH = 735;
  const fullH = 1780;
  const calculateSvgSmallH = (h: number) => {
    let resultH = h;
    if (!params.description) {
      resultH -= descH;
    }
    if (!params.stats) {
      resultH -= statsH;
    }
    return resultH;
  };
  const svgW = 886;
  const svgH = params.small ? calculateSvgSmallH(smallH) : fullH;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      x="0"
      y="0"
      width={front ? undefined : svgW}
      height={front ? undefined : svgH}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <foreignObject width={svgW} height={svgH} id="tiktokMain">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: "100%", height: "100%" }}
        >
          {children}
        </div>
      </foreignObject>
      <style dangerouslySetInnerHTML={{ __html: safeStyles }} />
    </svg>
  );
}
