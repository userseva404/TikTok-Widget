import { Logo } from "../ui/Logo";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="bg-card border-b border-b-border py-2 sticky top-0 left-0 w-full z-100">
      <Container>
        <Logo className="text-[clamp(1.5rem,1.286rem+1.071vw,2.25rem)]" />
      </Container>
    </header>
  );
}
