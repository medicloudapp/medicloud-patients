import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const UserLogin = async (document: string, password: string) => {
  try {
    const response = await api.post("/auth/patients", { document, password });
    return response.data;
  } catch (error) {
    console.error("Error en UserLogin:", error);
    return null;
  }
};

export const signUp = async (
  document: string,
  email: string,
  password: string
) => {
  try {
    const userData = {
      document,
      email,
      password,
    };

    // Envía el objeto userData al endpoint
    const response = await api.put("/patients/create-password", userData);
    return response.data;
  } catch (error) {
    console.error("Error en register:", error);
    return null;
  }
};

export const checkEmail = async (code: string, patientId: string) => {
  try {
    const response = await api.get(
      `/patients/VerifyCode?IdPatient=${patientId}&Code=${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en verificacion:", error);
    return null;
  }
};
