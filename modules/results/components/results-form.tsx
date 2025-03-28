"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { getAttachmentsByPatientId } from "@/modules/results/services/get-attachments";
import { ResultsTable } from "@/modules/results/components/results-table";
import { Attach } from "@/modules/results/interfaces/Attach";
import { auth } from "@/auth";

export const ResultsForm = () => {
  const [initialData, setInitialData] = useState<Attach[]>([]);
  const [session, setSession] = useState<{
    user?: {
      id: string;
      name: string;
      token: string;
    };
  } | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const authSession = await auth();
      setSession(authSession);

      if (authSession?.user?.id) {
        const data = await getAttachmentsByPatientId(authSession.user.id);
        setInitialData(data);
      }
    };

    fetchSession();
  }, []);

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
