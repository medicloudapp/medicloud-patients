import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const UserLogin = async (email: string, document: string) => {
  try {
    const response = await api.post("/auth/patients", { email, document });
    return response.data;
  } catch (error) {
    console.error("Error en UserLogin:", error);
    return null;
  }
};
