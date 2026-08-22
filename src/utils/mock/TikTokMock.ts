import { ITikTokVideo } from "../../../app/api/tiktok/data/route";

export class TikTokMock {
  static generateVideos = (): ITikTokVideo[] => {
    const one: ITikTokVideo = {
      share_count: 3,
      view_count: 48134,
      like_count: 2200,
      duration: 66,
      id: "7141376929814285573",
      share_url:
        "https://www.tiktok.com/@gromovick_/video/7141376929814285573?utm_campaign=tt4d_open_api&utm_source=sbawf13qub01myzqh6",
      title:
        "#1 #блоксфрутс #bloxfruits #onepiecefan #ванпіс #фрукт #fruit #топодин #топ #one #рекомендації #рек #славаукраїні #длятебе #foryou #роблокс #roblox #anime #аніме ",
      cover_image_url:
        "https://fastly.picsum.photos/id/403/300/400.jpg?hmac=Szm9yOaq-fxl0YqA8gt-jLNrWXa89WW6dYLizTV1k4k",
      width: 300,
      height: 400,
    };

    const premade = Array(10)
      .fill(0)
      .map(() => {
        return one;
      });
    return premade;
  };
}
