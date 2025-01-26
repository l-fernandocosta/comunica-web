import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UserModel from "@/lib/http/models/user.model";
import { useRemoveUser } from "@/lib/http/mutations/users/remove-user.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteUserAlertDialog({ userId }: { readonly userId: string }) {
  const client = useQueryClient();
  const mutation = useRemoveUser({
    onMutate: async (variables) => {
      await client.cancelQueries({ queryKey: ["users"] });

      const stale_users = client.getQueryData<UserModel[]>(["users"]);

      if (stale_users) {
        client.setQueryData<UserModel[]>(
          ["users"],
          stale_users.filter((user) => user.id !== variables)
        );
      }

      return { stale_users };
    },
    onError: (err, variables, context) => {
      const { stale_users } = context as { stale_users: UserModel[] };
      if (stale_users) {
        client.setQueryData<UserModel[]>(["users"], stale_users);
      }
      toast.error("Erro ao deletar usuário", {
        description: "Você não tem permissão para deletar este usuário",
      });
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
    onSuccess: () => toast.success("Usuário deletado com sucesso"),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          size="icon"
          title="Deletar"
          aria-label="Deletar usuário"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Esta ação irá deletar o usuário
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(userId)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
