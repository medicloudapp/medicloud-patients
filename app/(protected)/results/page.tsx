import { auth } from "@/auth";
import { ResultsForm } from "@/modules/results/components/results-form";

const ResultsPage = async () => {
  const session = await auth();
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 px-8 pt-2">
          <ResultsForm session={session} />
        </div>
      </div>
      {/* <DataTable searchKey="name" columns={ResultsColumns} data={data} /> */}
    </>
  );
};

export default ResultsPage;
