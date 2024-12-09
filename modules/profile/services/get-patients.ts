import { auth } from "@/auth";
import axiosInstance from "@/lib/client";
import { Patient } from "@/modules/profile/interfaces/profile";

export const getPatientById = async (patientId: string) => {
  const session = await auth(); // Obtén la sesión en el servidor

  if (!session || !session.user || !session.user.token) {
    throw new Error("No user session or token found");
  }

  try {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.user.token}`;
    const { data } = await axiosInstance.get(
      `/patients/only/${patientId}`
    );
    return data as Patient;
  } catch (error) {
    console.log("Error getting patient", error);
    throw error;
  }
};
