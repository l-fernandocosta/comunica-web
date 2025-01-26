"use client";

import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/lib/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { paths } from "./sidebar-paths";

export const SidebarNav = () => {
  const { isOpen } = useSidebar();

  return (
    <aside
      aria-label="Sidebar"
      id="cta-button-sidebar"
      className={cn(
        "justify-between h-screen transition-all ease-in-out delay-300 flex-col flex-1  border-r  dark:bg-transparent  xl:flex 2xl:flex hidden",
        !isOpen ? "w-[4.5rem]" : "min-w-[15rem]"
      )}
    >
      <div className="h-full overflow-y-auto flex flex-col gap-2 w-full ease-in-out delay-300">
        <div className="mt-5  my-2 gap-4 flex  flex-col  px-2 items-start w-full">
          <ul className="w-full  space-y-2 font-normal flex flex-col text-sm mt-5">
            {paths.map((path) => (
              <div key={path.title} className="w-full flex flex-col">
                <span
                  className="uppercase text-[10px]  font-semibold w-full data-[state=false]:hidden pb-2 flex"
                  data-state={isOpen}
                >
                  {path.title}
                </span>
                {path.items.map((item) => (
                  <SidebarItem options={item} key={item.path} />
                ))}
              </div>
            ))}
          </ul>
        </div>

        <Separator />
      </div>
    </aside>
  );
};
