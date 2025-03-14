"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ResultsColumns } from "@/modules/results/components/columns";
import { useResultStore } from "@/modules/results/store/results-store";
import { Attach } from "@/modules/results/interfaces/Attach";

interface ResultsTableProps {
  initialData: Attach[];
  token?: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  initialData,
  token,
}) => {
  const { setResults, results } = useResultStore();

  useEffect(() => {
    // Solo inicializa la store si aún no tiene datos
    if (results.length === 0 && initialData.length > 0) {
      setResults(initialData);
    }
  }, [initialData, results, setResults]);

  return (
    <>
      <DataTable
        searchKey="name"
        columns={ResultsColumns}
        data={results}
        token={token}
      />
    </>
  );
};
