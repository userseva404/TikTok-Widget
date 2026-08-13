export type TWidgets = "tiktok";

interface Provider {
  widgetDataApi: string;
  widgetApi: string;
  supabaseProviderName: string;
  name: string;
}
type IWidgetApi = Record<TWidgets, Provider>;

export const widgetsApi: IWidgetApi = {
  tiktok: {
    widgetDataApi: "https://d6xfx6ln-3000.euw.devtunnels.ms/api/tiktok/data",
    widgetApi: "https://d6xfx6ln-3000.euw.devtunnels.ms/api/tiktok/widget",
    supabaseProviderName: "tik_tok",
    name: "Tik Tok",
  },
};
