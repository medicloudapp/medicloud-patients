import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getPatientById } from "@/modules/profile/services/get-patients";
import { Patient } from "@/modules/profile/interfaces/profile";
import { UserCircle } from "lucide-react";

interface ProfileCardProps {
  patientId: string;
}

export const ProfileCard = async ({ patientId }: ProfileCardProps) => {
  const patient: Patient = await getPatientById(patientId);

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="border-b bg-blue-50/50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <UserCircle className="w-12 h-12 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-blue-900">Patient Profile</CardTitle>
            <CardDescription className="text-blue-700">
              Welcome, {patient.name}!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-base font-semibold text-gray-900">
                {patient.name} {patient.lastname}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Document ID</p>
              <p className="text-base font-semibold text-gray-900">
                {patient.document}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-base font-semibold text-gray-900">
                {new Date(patient.birthdate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Account Status
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    patient.status === 1 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <p className="text-base font-semibold text-gray-900">
                  {patient.status === 1 ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Personal Status
              </p>
              <p className="text-base font-semibold text-gray-900">
                {patient.usersstatus.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" bg-gray-50/50 flex justify-end gap-2 mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
      </CardFooter>
    </Card>
  );
};
