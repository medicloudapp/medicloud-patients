import {  ResultsForm } from "@/modules/results/components/results-form";

const ResultsPage = async () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 px-8 pt-2">
          <ResultsForm />
        </div>
      </div>
      {/* <DataTable searchKey="name" columns={ResultsColumns} data={data} /> */}
    </>
  );
};

export default ResultsPage;
