import { IWidget } from "../../app/api/tiktok/data/route";

import { WidgetVideoPart } from "./layout/WidgetVideoPart";
import { Navbar } from "./layout/Navbar";
import { Pfp } from "./ui/Pfp";
import { UserInfo } from "./ui/UserInfo";
import { ProfileStats } from "./ui/ProfileStats";
import { WidgetContainer } from "./layout/WidgetContainer";

export type TTikTokVersions = "default" | "small";
export interface IWidgetParams {
  stats?: boolean;
  description?: boolean;
  videoPartAnim?: boolean;
  small?: TTikTokVersions;
}

interface Props extends IWidget {
  params: IWidgetParams;
}

export function Widget({ user, videos, params }: Props) {
  const {
    avatar_large_url,
    display_name = "No display name",
    username = "No user name",
    follower_count = 0,
    following_count = 0,
    likes_count = 0,
    bio_description = "No bio",
  } = user;

  const {
    stats = false,
    description = false,
    small = "default",
    videoPartAnim = false,
  } = params;

  return (
    <main id="wrapper">
      <WidgetContainer>
        <section className="info">
          <div className="info__inner">
            <div className="info__user">
              <Pfp src={avatar_large_url} id="pfp" />
              <UserInfo display_name={display_name} username={username} />
            </div>
            {stats && (
              <ProfileStats
                follower_count={follower_count}
                following_count={following_count}
                likes_count={likes_count}
              />
            )}
            {description && (
              <p id="description">{bio_description || "No bio yet"}</p>
            )}
          </div>
        </section>
      </WidgetContainer>
      {small === "default" && (
        <>
          <WidgetVideoPart videos={videos} videoPartAnim={videoPartAnim} />
          <Navbar />
        </>
      )}
    </main>
  );
}
