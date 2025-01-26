import { useSidebar } from "@/lib/store/use-sidebar-store";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { SidebarNav } from "./sidebar";

vi.mock("@/lib/store/use-sidebar-store", () => ({
  useSidebar: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/"),
}));

describe("SidebarNav", () => {
  beforeEach(() => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: true });
    (useRouter as unknown as Mock).mockReturnValue({ push: vi.fn() });
  });

  it("should apply the correct classes when sidebar is open", () => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: true });

    render(<SidebarNav />);

    const sidebar = screen.getByLabelText("Sidebar");
    expect(sidebar).toHaveClass("min-w-[15rem]");
  });

  it("should apply the correct classes when sidebar is closed", () => {
    (useSidebar as unknown as Mock).mockReturnValue({ isOpen: false });

    render(<SidebarNav />);

    const sidebar = screen.getByLabelText("Sidebar");
    expect(sidebar).toHaveClass("w-[4.5rem]");
  });
});
