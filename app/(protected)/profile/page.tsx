import { ProfileForm } from "@/modules/profile/components/profile-form";

const ProfilePage = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      file: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      status: 1,
    },
    {
      id: 2,
      name: "Jane Doe",
      file: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      status: 1,
    },
  ];
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 px-8 pt-2">
          <ProfileForm initialData={data} />
        </div>
      </div>
      {/* <DataTable searchKey="name" columns={ResultsColumns} data={data} /> */}
    </>
  );
};

export default ProfilePage;
