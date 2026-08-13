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
    widgetDataApi: "https://chimerical-stroopwafel-101dd2.netlify.app/api/tiktok/data", // hard code
    widgetApi: "https://chimerical-stroopwafel-101dd2.netlify.app/api/tiktok/widget", // hard code
    supabaseProviderName: "tik_tok",
    name: "Tik Tok",
  },
};
