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

interface ProfileCardProps {
  patientId: string;
}

export const ProfileCard = async ({ patientId }: ProfileCardProps) => {
  const patient : Patient = await getPatientById(patientId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informacion del Perfil</CardTitle>
        <CardDescription>Bienvenido, {patient.name}!!</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>Nombre: {patient.name}</p>
          <p>Apellido: {patient.lastname}</p>
          <p>Documento: {patient.document}</p>
          <p>Fecha de Nacimiento: {patient.birthdate.split('T')[0]}</p>
          <p>Estado: {patient.status === 1 ? 'Activo' : 'Inactivo'}</p>
          <p>Estado personal de usuario: {patient.usersstatus.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Editar</Button>
      </CardFooter>
    </Card>
  );
};
