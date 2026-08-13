"use client";

import { TWidgets } from "lib/widgets";
import { TikTokConfiguration } from "./TikTokConfiguration";

interface IWidgetsConfiguration {
  connect: TWidgets;
  Component: React.ReactNode;
}

const widgetsConfiguration: IWidgetsConfiguration = {
  connect: "tiktok",
  Component: <TikTokConfiguration />,
};

export function HomeWidgetConfiguration() {
  const ConfigurationComponent = widgetsConfiguration.Component;

  return <> {ConfigurationComponent}</>;
}
