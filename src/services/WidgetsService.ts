import { TWidgets, widgetsApi } from "@/lib/widgets";

export class WidgetsService {
  static getWidgetData = (connect: TWidgets) => {
    if (connect === "tiktok") {
      const url = widgetsApi[connect].widgetDataApi;
      console.log("URL" ,url);
      
      return widgetsApi[connect].widgetDataApi;
    }
    return null;
  };
}
