"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export interface FilterColumnOptions {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterColumnProps {
  column: string;
  title: string;
  options: FilterColumnOptions[];
}

interface DataTableToolbarProps<TData> {
  readonly table: Table<TData>;
  readonly filterColumns?: FilterColumnProps[];
  readonly filterBy: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumns,
  filterBy = "name",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-1 items-end justify-end mr-2">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 mr-2"
          >
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {filterColumns
          ? filterColumns.map(
              (filter) =>
                table.getColumn(filter.column) && (
                  <DataTableFacetedFilter
                    title={filter.title}
                    key={filter.column}
                    options={filter.options}
                    column={table.getColumn(filter.column)}
                  />
                )
            )
          : null}
      </div>
      <DataTableViewOptions table={table} />
      <Input
        placeholder="Pesquisar"
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(filterBy)?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px] ml-2"
      />
    </div>
  );
}
