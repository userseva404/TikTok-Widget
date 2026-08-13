"use client";

import { useTikTokWidgetData } from "@/hooks/useTikTokWidget";
import { useSelectWidget } from "@/store/useSelectWidget";
import { TikTokPreview } from "./TikTokPreview";
import { TWidgets } from "@/lib/widgets";
import { IWidget } from "../../../app/api/tiktok/data/route";
import { useSelectWidgetModal } from "@/store/useSelectWidgetModal";
import { useEffect } from "react";

interface IWidgetsPreview {
  connect: TWidgets;
  Component: React.ComponentType<{ data: IWidget }>;
}

const widgetsPreview: IWidgetsPreview = {
  connect: "tiktok",
  Component: ({ data }) => <TikTokPreview data={data} />,
};

export function HomeWidgetPreview() {
  const { widget, setWidget } = useSelectWidget();
  const { data, isLoading, error, isValidating, mutate } =
    useTikTokWidgetData(widget);

  const PreviewComponent = widgetsPreview.Component;

  useEffect(() => {
    if (error && !isValidating) {
      mutate(undefined, { revalidate: false });
      setWidget(null);
    }
  }, [error, isValidating, setWidget]);

  const showLoading = widget && (isLoading || (isValidating && !data));

  return (
    <div className="flex relative mt-5 justify-center min-h-[300px] items-center py-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      {!widget && <NoWidget />}

      {showLoading && <Loading />}

      {data && !error && !showLoading && (
        <div className="w-[505px]">
          <PreviewComponent data={data} />
        </div>
      )}
    </div>
  );
}

interface Props {
  children?: React.ReactNode;
}

export function Txt({ children }: Props) {
  return <p className="text-[1.5rem]">{children}</p>;
}

export function NoWidget() {
  const { setOpen } = useSelectWidgetModal();

  return (
    <button onClick={() => setOpen(true)} className="w-full h-full absolute ">
      <Txt>Select widget to customize</Txt>
    </button>
  );
}

export function Loading() {
  return <Txt>Loading...</Txt>;
}

export function NoData() {
  return <Txt>Error happened</Txt>;
}
