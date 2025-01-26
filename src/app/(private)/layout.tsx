import { Header } from "@/components/shared/header";
import { SidebarNav } from "@/components/shared/sidebar/sidebar";
import { PropsWithChildren } from "react";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="flex flex-row max-h-[100dvh] overflow-y-auto">
        <SidebarNav />
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
