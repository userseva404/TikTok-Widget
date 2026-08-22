"use client";

import { useSelectWidgetModal } from "@/store/useSelectWidgetModal";
import { Modal } from "./Modal";
import { WidgetCard } from "../features/WidgetCard";
import { TWidgets } from "@/lib/widgets";
import { useSelectWidget } from "@/store/useSelectWidget";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";

interface TWidgetCard {
  connect: TWidgets;
  name: string;
}

const widgetCards: TWidgetCard[] = [
  {
    connect: "tiktok",
    name: "Tik Tok",
  },
];

export function SelectWidgetModal() {
  const { isOpen, setOpen } = useSelectWidgetModal();

  const { setWidget, widget } = useSelectWidget();
  const [localWidget, setLocalWidget] = useState<TWidgets | null>(widget);

  const handleSelect = (widget: TWidgets) => {
    setLocalWidget(widget);
  };

  useEffect(() => {
    (() => setLocalWidget(widget))();
  }, [widget]);

  return (
    <Modal
      open={isOpen}
      onOpen={setOpen}
      title="Select your widget"
      description="Widget selection modal"
      hideDesc
    >
      <div className="grid grid-rows-[1fr_auto] h-full">
        <div className="grid grid-cols-3 py-7 h-fit ">
          {widgetCards.map((widget) => {
            return (
              <WidgetCard
                key={widget.connect}
                className={cn(
                  "",
                  localWidget === widget.connect && "border-primary",
                )}
                onClick={() => {
                  handleSelect(widget.connect);
                }}
              >
                {widget.name}
              </WidgetCard>
            );
          })}
        </div>
        <div className="flex justify-end gap-5">
          <Button
            variant={"secondary"}
            onClick={() => {
              setLocalWidget(widget);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"primary"}
            onClick={() => {
              setWidget(localWidget);
              setOpen(false);
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </Modal>
  );
}
