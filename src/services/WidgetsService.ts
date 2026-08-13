import { TWidgets, widgetsApi } from "@/lib/widgets";

export class WidgetsService {
  static getWidgetData = (connect: TWidgets) => {
    if (connect === "tiktok") {
      return widgetsApi[connect].widgetDataApi;
    }
    return null;
  };
}
