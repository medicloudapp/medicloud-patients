"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AttachCol, ResultsColumns } from "@/modules/results/components/columns";

interface ProfileFormProps {
  initialData: AttachCol[];
}

export const ProfileForm = ({ initialData }: ProfileFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Perfil" description="Ver tus datos personales" />
      </div>
      <Separator/>
      <DataTable searchKey="name" columns={ResultsColumns} data={initialData} />
    </>
  );
};
