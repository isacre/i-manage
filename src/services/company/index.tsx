import { getCookie } from "../../utils"
import axios, { AxiosRequestConfig } from "axios"

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
}

export async function getCompanyByDomain(domain: string) {
  const response = await api.get(`/company/get_company_by_identifier/`, {
    params: { identifier: domain },
    headers: config.headers,
  })
  return response.data
}

export const api = axios.create(config)
