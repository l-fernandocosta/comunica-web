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

import { useSignin } from "@/lib/http/mutations/auth/sign-in/sign-in.mutation";
import {
  SignInInput,
  SignInInputType,
} from "@/lib/resolvers/auth/sign-in.resolver";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<SignInInputType>({
    resolver: zodResolver(SignInInput),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useSignin({
    onSuccess: () => {
      toast.success("Bem-vindo!");
      router.push("/home");
    },
    onError: () => toast.error("E-mail e/ou senha inválidos"),
  });

  const onSubmit = (data: SignInInputType) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
        <Button type="submit">Entrar</Button>
        <Link href={"/sign-up"} className="text-center">
          Criar uma conta
        </Link>
      </form>
    </Form>
  );
};

export default SignInForm;
