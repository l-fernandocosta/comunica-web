"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  SignUpInput,
  SignUpInputType,
} from "@/lib/resolvers/auth/sign-up.resolver";

import { useRegister } from "@/lib/http/mutations/auth/register/register.mutation";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const router = useRouter();

  const mutation = useRegister({
    onSuccess: (_, variables) => {
      toast.success("Bem-vindo, " + variables.name, {
        description: "Faça o login para continuar",
      });
      router.push("/");
    },
    onError: (e) => {
      toast.error("Algo deu errado.", {
        description:
          e.status == HttpStatusCode.Conflict
            ? "E-mail já cadastrado"
            : "Tente novamente",
      });
    },
  });

  const form = useForm<SignUpInputType>({
    resolver: zodResolver(SignUpInput),
    defaultValues,
  });

  const onSubmit = (data: SignUpInputType) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input {...field} name="name" placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="email"
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="password"
                  placeholder="*******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Criar Conta</Button>
        <Link href={"/"} className="text-center">
          Voltar
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
