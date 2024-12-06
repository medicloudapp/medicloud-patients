"use client";

import { CellAction } from "@/modules/profile/components/cell-action";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AttachCol = {
  id: number;
  name: string;
  file: string;
  status: number;
};

export const ResultsColumns: ColumnDef<AttachCol>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "file",
    header: "Archivo",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  }
];
