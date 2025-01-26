import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { useRouter } from "next/navigation";
import { PageHeader } from "./page-header";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({ back: vi.fn() }),
}));

describe("PageHeader", () => {
  it("should render the title correctly", () => {
    const mockTitle = "Test Title";
    render(<PageHeader title={mockTitle} />);

    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it("should call the router back function when the button is clicked", () => {
    const backMock = vi.fn();
    (useRouter as Mock).mockReturnValue({ back: backMock });

    render(<PageHeader title="Test Title" />);

    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);

    expect(backMock).toHaveBeenCalled();
  });
});
