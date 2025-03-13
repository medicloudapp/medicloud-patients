"use client";

// import { CellAction } from "@/modules/results/components/cell-action";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx"; // Instálalo si no está presente: npm install clsx
import { Checkbox } from "@/components/ui/checkbox";

// Define el tipo de los datos
export type AttachCol = {
  id: number;
  name: string;
  status: number;
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
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<number>("status"); // Obtiene el valor del estado
      const isActive = status === 1; // Define si está activo
      const statusText = isActive ? "Activo" : "Inactivo"; // Define el texto a mostrar

      return (
        <span
          className={clsx(
            "font-medium",
            isActive ? "text-black font-bold" : "text-red-500 font-bold" // Cambia de color según el estado
          )}
        >
          {statusText}
        </span>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
