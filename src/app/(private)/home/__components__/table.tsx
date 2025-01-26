"use client";

import TableSkeleton from "@/components/shared/loading/table-skeleton";
import { DataTable } from "@/components/shared/table/data-table";
import { useUsers } from "@/lib/http/queries/users/list-users/list-users.query";
import React from "react";
import column from "./column";

const UsersTable = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <TableSkeleton />;
  }
  return <DataTable columns={column} data={users ?? []} filterBy="Nome" />;
};

export default UsersTable;
