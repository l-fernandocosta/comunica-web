"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const PageHeader = ({ title }: { title: string }) => {
  const { back } = useRouter();
  return (
    <div className="flex flex-row col-span-2 h-auto items-center gap-5 sticky top-0 border-b z-50 dark:bg-transparent bg-transparent py-5 backdrop-blur-sm">
      <Button
        size={"sm"}
        className="rounded-full"
        onClick={back}
        variant={"secondary"}
      >
        <ArrowLeft className="w-3 h-3" />
      </Button>
      <h1 className="font-semibold text-sm">{title}</h1>
    </div>
  );
};
