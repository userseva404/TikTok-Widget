"use client";

import { useUser } from "@/hooks/useUser";
import { widgetsApi } from "@/lib/widgets";
import { useSelectWidget } from "@/store/useSelectWidget";
import { useWidgetParams } from "@/store/useTikTokWidgetParams";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/Button";
export function HomeWidgetURL() {
  const { widget } = useSelectWidget();
  const { getByClient } = useWidgetParams();
  const { user } = useUser();
  const innerTxt = (() => {
    if (!widget || !user) {
      return "No widget selected";
    }
    const params = getByClient(widget);

    const pureURL = widgetsApi[widget].widgetApi;
    const cleanParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)]),
    );
    const parmsTxt = new URLSearchParams({
      id: user.id,
      ...cleanParams,
    }).toString();
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
      <Button
        variant={"hollow"}
        size={"none"}
        className="stroke-accent interact:stroke-primary border-none bg-none"
        onClick={copyToClipboard}
      >
        <Copy className="stroke-inherit" />
      </Button>
    </div>
  );
}
