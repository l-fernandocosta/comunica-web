import React, { PropsWithChildren } from "react";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row w-full p-8 gap-8 max-h-screen h-screen ">
      <div className="flex flex-1  rounded-lg relative">
        <div className="flex flex-col m-auto min-w-[400px] gap-12">
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl font-medium">comunica.in 👋</h1>
            <div className="flex flex-col text-muted-foreground text-xs">
              <blockquote>
                “If a book about failures doesn&apos;t sell, is it a success?”
              </blockquote>
              <cite>Seinfeld, Jerry.</cite>
            </div>
          </div>
          {children}
          <span className="absolute bottom-2 text-muted-foreground text-xs">
            © 2025 ALL RIGHTS RESERVED | COMUNICA.IN
          </span>
        </div>
      </div>
      <div className="relative flex flex-1 h-full  rounded-lg bg-art-bg bg-no-repeat bg-cover" />
    </div>
  );
};

export default PublicLayout;
