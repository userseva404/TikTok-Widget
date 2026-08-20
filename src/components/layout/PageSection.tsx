interface Props {
  children?: React.ReactNode;
  title?: string;
  icon?: React.ElementType;
}

export function PageSection({ children, icon: Icon, title = "" }: Props) {
  return (
    <div
      className="border border-border
       bg-card p-2 rounded-xl my-5 "
    >
      <div className="flex items-center gap-2 text-[1.35rem]">
        {Icon && <Icon className="shrink-0 stroke-primary" />}
        <p className="font-semibold truncate shrink-0">{title}</p>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
