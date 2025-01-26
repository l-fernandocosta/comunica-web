import { render, screen, fireEvent } from "@testing-library/react";
import { useSidebar } from "@/lib/store/use-sidebar-store";
import { describe, expect, it, Mock, vi } from "vitest";
import { Header } from ".";

vi.mock("@/lib/store/use-sidebar-store", () => ({
  useSidebar: vi.fn().mockReturnValue({ toggle: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
}));

describe("Header", () => {
  it("should render the logo", () => {
    render(<Header />);

    const logo = screen.getByTestId(/comunica-logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("should call toggle function when sidebar button is clicked", () => {
    const toggleMock = vi.fn();
    (useSidebar as unknown as Mock).mockReturnValue({ toggle: toggleMock });

    render(<Header />);

    const toggleButton = screen.getByLabelText("Toggle Sidebar");
    fireEvent.click(toggleButton);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it("should render the logout button", () => {
    render(<Header />);

    const logoutButton = screen.getByTitle("Desconectar");
    expect(logoutButton).toBeInTheDocument();
  });

  it("should render the sidebar toggle button", () => {
    render(<Header />);

    const sidebarToggleButton = screen.getByLabelText("Toggle Sidebar");
    expect(sidebarToggleButton).toBeInTheDocument();
  });
});
