export type TWidgets = "tiktok";

interface Provider {
  widgetDataApi: string;
  widgetApi: string;
  supabaseProviderName: string;
  name: string;
}
type IWidgetApi = Record<TWidgets, Provider>;

const DEVELOP = false;

export const widgetsApi: IWidgetApi = {
  tiktok: {
    widgetDataApi: DEVELOP
      ? "https://d6xfx6ln-3000.euw.devtunnels.ms/api/tiktok/data/"
      : "https://tik-tok-widget-three.vercel.app/api/tiktok/data/", // hard code
    widgetApi: DEVELOP
      ? "https://d6xfx6ln-3000.euw.devtunnels.ms/api/tiktok/widget/"
      : "https://tik-tok-widget-three.vercel.app/api/tiktok/widget/", // hard code
    supabaseProviderName: "tik_tok",
    name: "Tik Tok",
  },
};
