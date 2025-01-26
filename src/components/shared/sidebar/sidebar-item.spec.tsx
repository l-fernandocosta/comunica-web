import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useSidebar } from "@/lib/store/use-sidebar-store";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

vi.mock("@/lib/store/use-sidebar-store", () => ({
  useSidebar: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("SidebarItem", () => {
  const mockOptions = {
    path: "/test-path",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} data-testid="icon" />
    ),
    title: "Test Item",
    id: "test-item",
  };

  it("should render the SidebarItem with title and icon", () => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: false });
    (usePathname as unknown as Mock).mockReturnValue("/");

    render(<SidebarItem options={mockOptions} />);

    const listItem = screen.getByTitle("Test Item");
    const icon = screen.getByTestId("icon");

    expect(listItem).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should render the title when the sidebar is open", () => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: true });
    (usePathname as unknown as Mock).mockReturnValue("/");

    render(<SidebarItem options={mockOptions} />);

    const title = screen.getByText("Test Item");
    expect(title).toBeInTheDocument();
  });

  it("should not render the title when the sidebar is closed", () => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: false });
    (usePathname as unknown as Mock).mockReturnValue("/");

    render(<SidebarItem options={mockOptions} />);

    const title = screen.queryByText("Test Item");
    expect(title).not.toBeInTheDocument();
  });
});
