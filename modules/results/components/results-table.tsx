"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ResultsColumns, AttachCol } from "@/modules/results/components/columns";
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

  const transformData = (data: Attach[]): AttachCol[] => {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      date: item.diary.dates[0].split("T")[0] || new Date().toISOString(),
      service: `${item.service.code} - ${item.service.description}` || 'N/A',
    }));
  };

  useEffect(() => {
    if (results.length === 0 && initialData.length > 0) {
      setResults(initialData);
    }
  }, [initialData, results, setResults]);

  return (
    <>
      <DataTable
        searchKey="service"
        columns={ResultsColumns}
        data={transformData(results)}
        token={token}
      />
    </>
  );
};
