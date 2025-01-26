"use client";

import UserModel from "@/lib/http/models/user.model";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/lib/http/mutations/users/update/update-user.mutation";
import {
  UpdateUserInput,
  UpdateUserInputType,
} from "@/lib/resolvers/user/update-user.resolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React from "react";

export function UpdateUserDialog({ user }: { readonly user: UserModel }) {
  const client = useQueryClient();

  const form = useForm<UpdateUserInputType>({
    resolver: zodResolver(UpdateUserInput),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const mutation = useUpdateUser({
    onMutate: async (variables) => {
      await client.cancelQueries({ queryKey: ["users"] });
      const users = client.getQueryData<UserModel[]>(["users"]);

      if (users) {
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, ...variables } : u
        );
        client.setQueryData(["users"], updatedUsers);
      }

      return { users };
    },
    onError: (err, variables, context) => {
      const { users } = context as { users: Array<UserModel> };
      client.setQueryData(["users"], users);
    },
    onSettled: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onSuccess: () => toast.success("Usuário atualizado com sucesso"),
  });

  function onSubmit(data: UpdateUserInputType) {
    mutation.mutate({
      ...data,
      id: user.id,
    });
  }

  React.useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
    }
  }, [user, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          size="icon"
          title="Editar"
          aria-label="Editar usuário"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Preencha todos os campos para finalizar
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 gap-2"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      className="input"
                      placeholder="Nome"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    O nome deve ter pelo menos 1 dígito.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      className="input"
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  );
}
