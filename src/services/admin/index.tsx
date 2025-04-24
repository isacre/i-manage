import { getCookie } from "@/utils"
import axios, { AxiosRequestConfig } from "axios"

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
}

export const api = axios.create(config)

api.interceptors.request.use((config) => {
  const accessToken = getCookie("access")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
