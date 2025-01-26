import { PageHeader } from "../page-header/page-header";

interface ContentContainerProps {
  children: React.ReactNode;
  title?: string;
  isTopBarHidden?: boolean;
}

export const ContentContainer = ({
  children,
  title = "",
  isTopBarHidden = false,
}: ContentContainerProps) => {
  return (
    <div className="px-6 w-full overflow-y-auto z-10 flex flex-col gap-4 h-auto">
      {isTopBarHidden ? null : <PageHeader title={title} />}
      {children}
    </div>
  );
};
