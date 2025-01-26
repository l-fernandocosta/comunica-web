import { ResolverMessage } from "@/lib/resolvers/resolver-message";
import { renderWithClient } from "@/lib/utils/test/render-with-client";
import { fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import RegisterForm from "./register-form";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("RegisterForm unit test", () => {
  it("should render correctly", () => {
    const container = renderWithClient(<RegisterForm />);
    expect(container).toBeDefined();
  });

  it("should render form with all inputs", () => {
    const container = renderWithClient(<RegisterForm />);
    const email_input = container.getByLabelText("E-mail");
    const name_input = container.getByLabelText(/nome completo/i);
    const password_input = container.getByLabelText("Senha");
    const submit_button = container.getByText("Criar Conta");
    const backButton = container.getByText("Voltar");

    expect(backButton).toBeDefined();
    expect(name_input).toBeDefined();
    expect(email_input).toBeDefined();
    expect(submit_button).toBeDefined();
    expect(password_input).toBeDefined();

    expect(password_input).toHaveAttribute("type", "password");
    expect(submit_button).toHaveAttribute("type", "submit");

    expect(email_input).toHaveValue("");
    expect(name_input).toHaveValue("");
    expect(password_input).toHaveValue("");
  });

  it("should display error message when user types invalid properties", async () => {
    const container = renderWithClient(<RegisterForm />);
    const email_input = container.getByLabelText("E-mail");
    const password_input = container.getByLabelText("Senha");
    const name_input = container.getByLabelText(/nome completo/i);
    const submit_button = container.getByText("Criar Conta");
    const backButton = container.getByText("Voltar");

    expect(email_input).toBeDefined();
    expect(password_input).toBeDefined();
    expect(submit_button).toBeDefined();
    expect(backButton).toBeDefined();
    expect(name_input).toBeDefined();

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: "invalid-email" } });
      fireEvent.change(password_input, { target: { value: "123" } });
      fireEvent.change(name_input, { target: { value: "" } });
      submit_button.click();
    });

    const email_error = container.getByText(ResolverMessage.InvalidEmail);
    const password_error = container.getByText(ResolverMessage.Min(8));
    const name_error = container.getByText(ResolverMessage.Min(1));

    expect(email_error).toBeDefined();
    expect(password_error).toBeDefined();
    expect(name_error).toBeDefined();
  });

  it("should NOT display error message if user types VALID properties", async () => {
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    const container = renderWithClient(<RegisterForm />);
    const email_input = container.getByLabelText("E-mail");
    const password_input = container.getByLabelText("Senha");
    const name_input = container.getByLabelText(/nome completo/i);

    const submit_button = container.getByText("Criar Conta");

    expect(email_input).toBeDefined();
    expect(password_input).toBeDefined();
    expect(submit_button).toBeDefined();
    expect(name_input).toBeDefined();

    await waitFor(() => {
      fireEvent.change(email_input, {
        target: { value: "fernando@gmail.com" },
      });
      fireEvent.change(password_input, { target: { value: "123@456Abs" } });
      fireEvent.change(name_input, { target: { value: "Fernando Costa" } });
      submit_button.click();
    });

    const email_error = container.queryByText(ResolverMessage.InvalidEmail);
    const password_error = container.queryByText(ResolverMessage.Min(8));

    expect(email_error).not.toBeInTheDocument();
    expect(password_error).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
