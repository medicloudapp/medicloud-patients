import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const UserLogin = async (document: string, password: string) => {
  try {
    const response = await api.post("/auth/patients", { document, password });
    return {
      success: true,
      data: response.data,
      message: "Login exitoso",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Error en la autenticación",
        status: error.response?.status,
      };
    }
    return {
      success: false,
      message: "Error inesperado durante el login",
      status: 500,
    };
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
    const response = await api.put("/auth/RegisterPatientAsync", userData);
    return response.data;
  } catch (error) {
    console.error("Error en register:", error);
    return null;
  }
};

export const checkEmail = async (code: string, patientId: string) => {
  try {
    const response = await api.get(
      `/auth/VerifyCodePatient?IdPatient=${patientId}&Code=${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en verificacion:", error);
    return null;
  }
};
