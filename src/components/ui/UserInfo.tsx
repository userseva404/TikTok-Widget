interface Props {
  display_name: string;
  username: string;
}

export function UserInfo({ display_name, username }: Props) {
  return (
    <div className="info__username">
      <p id="name" className="accent">
        {display_name}
      </p>
      <p id="username" className="muted">
        {username}
      </p>
    </div>
  );
}
