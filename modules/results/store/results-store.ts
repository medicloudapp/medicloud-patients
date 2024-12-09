// stores/useDataStore.ts
import { create } from "zustand";
import { Attach } from "@/modules/results/interfaces/Attach";
import { persist } from "zustand/middleware";

interface ResultsStore {
  results: Attach[];
  loading: boolean;
  error: string | null;
  setResults: (results: Attach[]) => void;
}

export const useResultStore = create<ResultsStore>()(
  persist(
    (set) => ({
      results: [],
      loading: false,
      error: null,

      setResults: (results) => {
        set({ results: results, loading: false });
      },
    }),
    {
      name: "results-store",
    }
  )
);
