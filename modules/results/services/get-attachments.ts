import { auth } from "@/auth";
import axiosInstance from "@/lib/client";
import type { Attach } from "@/modules/results/interfaces/Attach";

export const getAttachmentsByPatientId = async (patientId: string) => {
  const session = await auth(); // Obtén la sesión en el servidor

  if (!session || !session.user || !session.user.token) {
    throw new Error("No user session or token found");
  }

  try {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.user.token}`;
    const { data } = await axiosInstance.get(
      `/patient-annexes/patient/${patientId}`
    );
    return data as Attach[];
  } catch (error) {
    console.log("Error getting attachments", error);
    throw error;
  }
};
