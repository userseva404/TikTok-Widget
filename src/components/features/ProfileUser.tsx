import { useUser } from "@/hooks/useUser";

export function ProfileUser() {
  const { user } = useUser();
  if (!user) {
    return;
  }

  return (
    <div
      key={user.email}
      className="flex justify-evenly gap-x-4 gap-y-2 wrap flex-col sm:flex-row"
    >
      <ProfileInfo title="User id:">{user.id}</ProfileInfo>
      <ProfileInfo title="Email:">{user.email}</ProfileInfo>
    </div>
  );
}

interface ProfileInfoProps {
  children?: React.ReactNode;
  title: string;
}

function ProfileInfo({ title, children }: ProfileInfoProps) {
  return (
    <div className="text-[1.25rem] truncate">
      <p className="text-[1.25em] font-semibold truncate">{title}</p>
      <p className="text-[1em] truncate">{children}</p>
    </div>
  );
}
