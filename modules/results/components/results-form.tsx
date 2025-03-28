"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { getAttachmentsByPatientId } from "@/modules/results/services/get-attachments";
import { ResultsTable } from "@/modules/results/components/results-table";
import { Attach } from "@/modules/results/interfaces/Attach";

interface ResultsFormProps {
  session: {
    user?: {
      id: string;
      name: string;
      token: string;
    };
  } | null;
}

export const ResultsForm = ({ session }: ResultsFormProps) => {
  const [initialData, setInitialData] = useState<Attach[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const data = await getAttachmentsByPatientId(session.user.id);
        setInitialData(data);
      }
    };

    fetchData();
  }, [session]);

  if (!session?.user) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Resultados de Pruebas"
          description={`Bienvenido, ${session.user.name}!!`}
        />
      </div>
      <ResultsTable
        initialData={initialData}
        token={session.user.token as string}
      />
    </>
  );
};
