import { Navbar } from "@/components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full h-screen flex flex-col gap-y-10 "
    >
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
