import { UserType } from "@/stores/user-store";
import { Category } from "@/types";
import { getCookie, setCookie } from "@/utils";
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

export declare type CompanyRegisterForm = {
  category: Category;
  closes_at: string;
  description: string;
  email: string;
  image: File;
  name: string;
  opens_at: string;
  password: string;
  phone: string;
  work_days: string[];
};

export async function registerCompany(data: CompanyRegisterForm) {
  const company = await api.post(`/company/register_company/`, data);
  return company.data;
}

export async function getTokens(data: { email: string; password: string }): Promise<{ access: string; refresh: string }> {
  const company = await api.post(`/auth/jwt/create/`, data);
  return company.data;
}

export async function getNewTokens(data: { refresh: string }): Promise<{ access: string; refresh: string }> {
  const company = await api.post(`/auth/jwt/refresh/`, data);
  return company.data;
}

export async function getUserData(): Promise<UserType> {
  const user = await api.get(`/auth/users/me/`);
  return user.data;
}
