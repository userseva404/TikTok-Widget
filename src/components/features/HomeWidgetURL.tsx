"use client";

import { widgetsApi } from "@/lib/widgets";
import { useSelectWidget } from "@/store/useSelectWidget";
import { useWidgetParams } from "@/store/useTikTokWidgetParams";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
export function HomeWidgetURL() {
  const { widget } = useSelectWidget();
  const { getByClient } = useWidgetParams();

  const innerTxt = (() => {
    if (!widget) {
      return "No widget selected";
    }
    const params = getByClient(widget);

    const pureURL = widgetsApi[widget].widgetApi;
    const cleanParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)]),
    );
    const parmsTxt = new URLSearchParams(cleanParams).toString();
    return `${pureURL}?${parmsTxt}`;
  })();

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(innerTxt);
      toast.success("Text copied to clipboard successfully!");
    } catch {
      toast.error("Failed to copy text");
    }
  }

  return (
    <div className="w-full bg-secondary p-2 px-4 rounded-xl grid grid-cols-[1fr_auto]">
      <p className="text-[1.25rem] truncate">{innerTxt}</p>
      <button
        className="stroke-accent interact:stroke-primary"
        onClick={copyToClipboard}
      >
        <Copy className="stroke-inherit" />
      </button>
    </div>
  );
}
