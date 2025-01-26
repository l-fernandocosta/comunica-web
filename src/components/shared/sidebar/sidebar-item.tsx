"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  options: {
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    id: string;
  };
}

export const SidebarItem = ({ options }: SidebarItemProps) => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();
  const isCurrentPath = pathname.includes(options.path);
  const variantBasedOnPath = isCurrentPath ? "secondary" : "ghost";

  return (
    <li title={options.title} aria-label={options.title} id={options.id}>
      <Button
        asChild
        size="icon"
        variant={isCurrentPath ? variantBasedOnPath : "ghost"}
      >
        <Link
          href={options.path}
          className={cn(
            "flex items-center p-2 h-12 text-gray-900 rounded-lg   dark:text-white  group w-full  hover:transition-all",
            isOpen && "flex flex-row w-full items-center justify-start"
          )}
        >
          {<options.icon className="w-4 h-4" />}
          {isOpen && (
            <span className="flex-1 ml-3 whitespace-nowrap">
              {options.title}
            </span>
          )}
        </Link>
      </Button>
    </li>
  );
};
