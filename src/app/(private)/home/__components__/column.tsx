import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import UserModel from "@/lib/http/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserAlertDialog } from "./delete-user-alert-dialog";
import { UpdateUserDialog } from "./update-user-dialog";

const column: ColumnDef<UserModel>[] = [
  {
    id: "Nome",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader title="Nome" column={column} />
    ),
  },

  {
    id: "E-mail",
    accessorFn: (row) => row.email,
    header: ({ column }) => (
      <DataTableColumnHeader title="E-mail" column={column} />
    ),
  },
  {
    id: "Ações",
    accessorFn: (row) => row.email,
    header: "Ações",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-row items-center space-x-2">
          <DeleteUserAlertDialog userId={user.id} />
          <UpdateUserDialog user={user} />
        </div>
      );
    },
  },
];

export default column;
