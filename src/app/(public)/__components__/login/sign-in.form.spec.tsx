import { ResolverMessage } from "@/lib/resolvers/resolver-message";
import { renderWithClient } from "@/lib/utils/test/render-with-client";
import { fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import SignInForm from "./sign-in.form";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SignInForm unit test", () => {
  it("should render correctly", () => {
    const container = renderWithClient(<SignInForm />);
    expect(container).toBeDefined();
  });

  it("should render form with all inputs", () => {
    const container = renderWithClient(<SignInForm />);
    const email_input = container.getByLabelText("E-mail");
    const password_input = container.getByLabelText("Senha");
    const submit_button = container.getByText("Entrar");
    const register = container.getByText("Criar uma conta");

    expect(email_input).toBeDefined();
    expect(password_input).toBeDefined();
    expect(submit_button).toBeDefined();
    expect(register).toBeDefined();

    expect(password_input).toHaveAttribute("type", "password");
    expect(submit_button).toHaveAttribute("type", "submit");

    expect(email_input).toHaveValue("");
    expect(password_input).toHaveValue("");
  });

  it("should display error message when user types invalid properties", async () => {
    const container = renderWithClient(<SignInForm />);
    const email_input = container.getByLabelText("E-mail");
    const password_input = container.getByLabelText("Senha");
    const submit_button = container.getByText("Entrar");
    const register = container.getByText("Criar uma conta");

    expect(email_input).toBeDefined();
    expect(password_input).toBeDefined();
    expect(submit_button).toBeDefined();
    expect(register).toBeDefined();

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: "invalid-email" } });
      fireEvent.change(password_input, { target: { value: "123" } });
      submit_button.click();
    });

    const email_error = container.getByText(ResolverMessage.InvalidEmail);
    const password_error = container.getByText(ResolverMessage.Min(8));

    expect(email_error).toBeDefined();
    expect(password_error).toBeDefined();
  });

  it("should NOT display error message if user types VALID properties", async () => {
    const mockFn = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockFn });
    const container = renderWithClient(<SignInForm />);
    const email_input = container.getByLabelText("E-mail");
    const password_input = container.getByLabelText("Senha");
    const submit_button = container.getByText("Entrar");

    expect(email_input).toBeDefined();
    expect(password_input).toBeDefined();
    expect(submit_button).toBeDefined();

    await waitFor(() => {
      fireEvent.change(email_input, {
        target: { value: "fernando@gmail.com" },
      });
      fireEvent.change(password_input, { target: { value: "123@456Abs" } });
      submit_button.click();
    });

    const email_error = container.queryByText(ResolverMessage.InvalidEmail);
    const password_error = container.queryByText(ResolverMessage.Min(8));

    expect(email_error).not.toBeInTheDocument();
    expect(password_error).not.toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledWith("/home");
  });
});
