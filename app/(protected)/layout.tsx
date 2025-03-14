import { Navbar } from "@/components/navbar";
import { getUserId } from "@/lib/utils";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserId();

  if (!userId) return null;

  return (
    <div className="w-full h-screen flex flex-col gap-y-10 ">
      <Navbar />
      {children}
    </div>
  );
}
