import { EmployeeType } from "@/stores/employee-store";
import { getCookie } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

api.interceptors.request.use((config) => {
  const accessToken = getCookie("access");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export async function registerEmployee(data: { name: string; phone: string }, company: number): Promise<EmployeeType> {
  const response = await api.post("/employee/", { ...data, is_active: true, company });
  return response.data;
}

export async function getEmployees(company: number): Promise<EmployeeType[]> {
  const response = await api.get("/employee/", { params: { company } });
  return response.data;
}

export async function deleteEmployee(id: string, company: number): Promise<void> {
  await api.delete(`/employee/${id}/`, { params: { company } });
}

export async function updateEmployee(id: string, data: { name: string; phone: string }, company: number): Promise<EmployeeType> {
  const response = await api.put(`/employee/${id}/`, { ...data, is_active: true, company });
  return response.data;
}
