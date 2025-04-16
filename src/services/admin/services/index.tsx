import { ServiceType } from "@/stores/service-store";
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

export async function registerService(data: { name: string; price: number; company: number }): Promise<ServiceType> {
  const response = await api.post("/service/", { ...data, is_active: true });
  return response.data;
}

export async function getServices(company: number): Promise<ServiceType[]> {
  const response = await api.get("/service/", { params: { company } });
  return response.data;
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`/service/${id}/`);
}

export async function updateService(id: string, data: { name: string; price: number; company: number }): Promise<ServiceType> {
  const response = await api.put(`/service/${id}/`, { ...data, is_active: true });
  return response.data;
}
