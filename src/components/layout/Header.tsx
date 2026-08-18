import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Container } from "./Container";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b border-b-border py-2 sticky top-0 left-0 w-full z-100">
      <Container>
        <div className="flex justify-between items-center">
          <Logo className="text-[clamp(1.5rem,1.286rem+1.071vw,2.25rem)]" />
          <Link href={"/profile"} className="interact:bg-primary-hover/15 interact:border interact:border-border p-2 rounded-xl">
            <User className="size-7 stroke-text-primary" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </header>
  );
}
