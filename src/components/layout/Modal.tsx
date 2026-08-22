import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { Fragment, useMemo } from "react";
import { Button } from "../ui/Button";

interface Props {
  children?: React.ReactNode;
  hideTitle?: boolean;
  hideDesc?: boolean;
  title: string;
  description: string;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export function Modal({
  children,
  hideTitle = false,
  hideDesc = false,
  title = "",
  description = "",
  open = false,
  onOpen,
}: Props) {
  const TitleComp = useMemo(() => {
    if (hideTitle) {
      return VisuallyHidden;
    } else {
      return Fragment;
    }
  }, [hideTitle]);
  const DescComp = useMemo(() => {
    if (hideDesc) {
      return VisuallyHidden;
    } else {
      return Fragment;
    }
  }, [hideDesc]);

  return (
    <Dialog.Root open={open} defaultOpen={open} onOpenChange={onOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-card/30" />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 -translate-1/2 bg-card border border-border/50 rounded-xl
            w-full
            max-w-full
            h-full
            sm:p-7
            sm:max-h-[75svh]
            sm:h-fit
            sm:max-w-[clamp(600px,65dvw,800px)]
            z-1000
            py-20
            px-7
            grid
            grid-rows-[auto_1fr]
            `}
        >
          <div className="text-center text-[1.5rem] px-8">
            <TitleComp>
              <Dialog.Title className="text-[1em]">{title}</Dialog.Title>
            </TitleComp>
            <DescComp>
              <Dialog.Description className="text-text-secondary text-[0.8em]">
                {description}
              </Dialog.Description>
            </DescComp>
          </div>
          <div>{children}</div>
          <Dialog.Close asChild>
            <Button
              variant={"hollow"}
              size={"icon"}
              className="absolute right-2 top-2 acc-10"
            >
              <X className="size-8" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
