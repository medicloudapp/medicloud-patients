import axiosInstance from "@/lib/client";
import { FileProcessRequest } from "@/modules/results/interfaces/Attach";

export const processFile = async (data: FileProcessRequest, token: string) => {
  try {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    const response = await axiosInstance.post("/MailSender/SenderEmail", data);
    return response.data;
  } catch (error) {
    console.log("Error processing file", error);
    throw error;
  }
};

