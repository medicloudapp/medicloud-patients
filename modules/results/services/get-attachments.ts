import axiosInstance from "@/lib/client";
import type { Attach } from "@/modules/results/interfaces/Attach";

export const getAttachmentsByPatientId = async (patientId: string) => {
  try {
    const { data } = await axiosInstance.get(`/patient-annexes/only/patient/${patientId}`);
    return data as Attach[];
  } catch (error) {
    console.log("Error getting attachments", error);
    throw error;
  }
};
