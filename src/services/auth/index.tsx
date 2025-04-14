import { Category } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

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
