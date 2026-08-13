interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const fallbackImg =
  "https://immunologie-kiel.de/wp-content/uploads/2021/12/profile-fallback.e7a6f788830c.jpg";

export function Pfp({ fallback = fallbackImg, src, ...props }: Props) {
  return (
    <img
      loading="lazy"
      src={src || fallback}
      alt="Profile picture"
      {...props}
    />
  );
}
