export type TWidgets = "tiktok";

interface Provider {
  widgetDataApi: string;
  widgetApi: string;
  supabaseProviderName: string;
  name: string;
}
type IWidgetApi = Record<TWidgets, Provider>;

const DEVELOP = process.env.DEVELOP === "true";

const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN_URL + "/api";

console.log("ORIGIN", ORIGIN);

const tikTokApi: Omit<Provider, "supabaseProviderName" | "name"> = {
  widgetDataApi: `${ORIGIN}/tiktok/data`,
  widgetApi: ORIGIN + "tiktok/widget",
};

export const widgetsApi: IWidgetApi = {
  tiktok: {
    widgetDataApi: tikTokApi.widgetDataApi,
    widgetApi: tikTokApi.widgetApi,
    supabaseProviderName: "tik_tok",
    name: "Tik Tok",
  },
};
