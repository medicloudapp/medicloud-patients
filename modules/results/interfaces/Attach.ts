export interface Attach {
  id: number;
  name: string;
  file: string;
  patientId: number;
  status: number;
}

export interface FileProcessRequest {
  patientId: number;
  fileLink: string;
}
