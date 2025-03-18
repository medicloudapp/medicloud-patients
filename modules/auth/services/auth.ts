import axios from "axios";
import https from 'https';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 30000, // Increased timeout for Docker environment
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Required for Docker container communication
    minVersion: 'TLSv1.2',
    keepAlive: true
  })
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("[API Error]", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        message: error.message,
        code: error.code
      });
    }
    return Promise.reject(error);
  }
);

export const UserLogin = async (document: string, password: string) => {
  try {
    const response = await api.post("/auth/patients", { document, password });
    console.log('[Login Success]', { status: response.status });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const signUp = async (document: string, email: string, password: string) => {
  try {
    const userData = { document, email, password };
    const response = await api.put("/patients/create-password", userData);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const checkEmail = async (code: string, patientId: string) => {
  try {
    const response = await api.get(`/patients/VerifyCode?IdPatient=${patientId}&Code=${code}`);
    return response.data;
  } catch (error) {
    return null;
  }
};