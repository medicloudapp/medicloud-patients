import axiosInstance from "@/lib/client";
import type { Attach } from "@/modules/results/interfaces/Attach";

export const getAttachmentsByPatientId = async (patientId: string, token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = await axiosInstance.get(
      `/patient-annexes/only-results/medicloud-patients/${patientId}`
    );
    return data as Attach[];
  } catch (error) {
    console.log("Error getting attachments", error);
    throw error;
  }
};
