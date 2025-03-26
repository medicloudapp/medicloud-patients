"use client";

// import { CellAction } from "@/modules/results/components/cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

// Define el tipo de los datos
export type AttachCol = {
  id: number;
  name: string;
  date: string;
  service: string;
};

export const ResultsColumns: ColumnDef<AttachCol>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "service",
    header: "Servicio",
  }
];
