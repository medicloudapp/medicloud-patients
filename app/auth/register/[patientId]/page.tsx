import { VerifyForm } from "@/modules/auth/components/verify-email";

export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{
    patientId: string;
  }>;
}

const VerifyEmailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  return <VerifyForm patientId={resolvedParams.patientId} />;
};

export default VerifyEmailPage;
