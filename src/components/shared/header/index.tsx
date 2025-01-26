"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/store/use-sidebar-store";
import { LogOut, PanelLeft } from "lucide-react";
import ComunicaLogo from "../comunica-logo/comunica-logo";
import { useRouter } from "next/navigation";
import AuthorizationCookies from "@/lib/utils/authorization-cookie.handler";

export const Header = () => {
  const { push } = useRouter();
  const { toggle } = useSidebar();

  const onSignOut = () => {
    AuthorizationCookies.destroySession();
    push("/");
  };
  return (
    <div className="border-b  pr-5 sticky top-0 dark:bg-muted/50 bg-transparent z-50 backdrop-blur-md">
      <div className="flex h-16 items-center">
        <div className=" flex items-center  w-full justify-between">
          <div className="gap-2 flex flex-row items-center">
            <Button
              size={"icon"}
              onClick={toggle}
              variant={"ghost"}
              className="h-9"
              title="Abrir menu"
              aria-label="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4 " />
            </Button>
          </div>
          <ComunicaLogo />
          <Button
            variant={"secondary"}
            size="icon"
            title="Desconectar"
            onClick={onSignOut}
          >
            <LogOut className="w-4 h-4" aria-label="Desconectar" />
          </Button>
        </div>
      </div>
    </div>
  );
};
