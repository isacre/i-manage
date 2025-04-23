import { UserType } from "@/stores/user-store";
import { Category } from "@/types";
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
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
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

export async function getUserData(): Promise<UserType> {
  const user = await api.get(`/auth/users/me/`);
  return user.data;
}

export declare type UserRegisterForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export async function registerUser(data: UserRegisterForm) {
  const user = await api.post(`/auth/users/`, data);
  return user.data;
}
