"use client";

import { TWidgets } from "@/lib/widgets";
import { TikTokConfiguration } from "./TikTokConfiguration";
import { useSelectWidget } from "@/store/useSelectWidget";

type IWidgetsConfiguration = {
  [K in TWidgets]: React.ReactElement;
};

const widgetsConfiguration: IWidgetsConfiguration = {
  tiktok: <TikTokConfiguration />,
};

export function HomeWidgetConfiguration() {
  return (
    <div className="bg-secondary p-2 px-4 rounded-xl">
      <HomeWidgetConfigurationContent />
    </div>
  );
}

export function HomeWidgetConfigurationContent() {
  const { widget } = useSelectWidget();

  if (!widget) {
    return <p className="text-[1.25rem]">Select widget to configure</p>;
  }

  const ConfigurationComponent = widgetsConfiguration[widget];

  return <>{ConfigurationComponent}</>;
}
