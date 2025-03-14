import { auth } from "@/auth";
import { Heading } from "@/components/ui/heading";
import { getAttachmentsByPatientId } from "@/modules/results/services/get-attachments";
import { ResultsTable } from "@/modules/results/components/results-table";

export const ResultsForm = async () => {
  const session = await auth();
  const initialData = await getAttachmentsByPatientId(
    session?.user?.id as string
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Resultados de Pruebas"
          description={`Bienvenido, ${session?.user?.name}!!`}
        />
      </div>
      <ResultsTable
        initialData={initialData}
        token={session?.user?.token as string}
      />
    </>
  );
};
