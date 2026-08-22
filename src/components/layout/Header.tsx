import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Container } from "./Container";
import { User } from "lucide-react";
import { LogOutBtn } from "../features/LogOutBtn";
import { Button } from "../ui/Button";

export function Header() {
  return (
    <header className="bg-card border-b border-b-border py-2 sticky top-0 left-0 w-full z-100">
      <Container>
        <div className="flex justify-between items-center">
          <Logo className="text-[clamp(1.5rem,1.286rem+1.071vw,2.25rem)]" />
          <div className="flex gap-2">
            <Button asChild size={"icon"} variant={"hollow"} >
              <Link
                href={"/profile"}
                className="stroke-text-primary interact:bg-secondary-hover/40 border border-transparent interact:border-border p-2 rounded-xl"
              >
                <User size={28} />
              </Link>
            </Button>
            <LogOutBtn />
          </div>
        </div>
      </Container>
    </header>
  );
}
