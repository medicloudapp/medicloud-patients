import { VerifyForm } from "@/modules/auth/components/verify-email";

interface PageProps {
  params: { patientId: string };
}

const VerifyEmailPage: React.FC<PageProps> = async ({ params }) => {
  const { patientId } = await params;

  return <VerifyForm patientId={patientId} />;
};

export default VerifyEmailPage;
