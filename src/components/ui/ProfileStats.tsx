import { formatNumber } from "@/utils/formatNumber";

interface Props {
  following_count: number;
  follower_count: number;
  likes_count: number;
}

export function ProfileStats({
  follower_count,
  following_count,
  likes_count,
}: Props) {
  return (
    <div className="info__stats">
      <div className="stats__stat">
        <p className="accent">{formatNumber(following_count)}</p>
        <p className="muted">Following</p>
      </div>
      <div className="stats__stat">
        <p className="accent">{formatNumber(follower_count)}</p>
        <p className="muted">Followers</p>
      </div>
      <div className="stats__stat">
        <p className="accent">{formatNumber(likes_count)}</p>
        <p className="muted">Likes</p>
      </div>
    </div>
  );
}
