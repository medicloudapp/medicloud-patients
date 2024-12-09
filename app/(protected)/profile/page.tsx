import { ProfileForm } from "@/modules/profile/components/profile-form";

const ProfilePage = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 px-8 pt-2">
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
