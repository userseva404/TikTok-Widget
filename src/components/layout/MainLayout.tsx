import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children?: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <section className="flex flex-col min-h-dvh">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </section>
  );
}
