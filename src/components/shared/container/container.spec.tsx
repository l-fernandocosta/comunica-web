import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContentContainer } from "./container";

vi.mock("../page-header/page-header", () => ({
  PageHeader: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("ContentContainer", () => {
  it("should render children correctly", () => {
    render(
      <ContentContainer>
        <div>Child Content</div>
      </ContentContainer>
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should render the PageHeader with the correct title when isTopBarHidden is false", () => {
    const title = "Test Title";
    render(
      <ContentContainer title={title} isTopBarHidden={false}>
        <div>Child Content</div>
      </ContentContainer>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should not render the PageHeader when isTopBarHidden is true", () => {
    render(
      <ContentContainer isTopBarHidden={true}>
        <div>Child Content</div>
      </ContentContainer>
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("should apply correct styles to the container", () => {
    const { container } = render(
      <ContentContainer>
        <div></div>
      </ContentContainer>
    );

    expect(container.firstChild).toHaveClass(
      "px-6 w-full overflow-y-auto z-10 flex flex-col gap-4 h-auto"
    );
  });
});
