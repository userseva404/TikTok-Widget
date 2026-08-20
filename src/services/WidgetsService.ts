import { TWidgets, widgetsApi } from "@/lib/widgets";

export class WidgetsService {
  static getWidgetData = (connect: TWidgets, id: string) => {
    if (connect === "tiktok") {
      return widgetsApi[connect].widgetDataApi + `?id=${id}`;
    }
    return null;
  };
}
