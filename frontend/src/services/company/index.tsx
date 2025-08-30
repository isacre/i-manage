import axios, { AxiosRequestConfig } from "axios"
import { CompanyType } from "../../types"

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
}

export const api = axios.create(config)

export async function getCompanyByDomain(domain: string): Promise<CompanyType> {
  const response = await api.get(`/company/get_company_by_identifier/`, {
    params: { identifier: domain },
    headers: config.headers,
  })
  return response.data
}

export async function updateCompany(companyId: number, data: Partial<CompanyType> | FormData): Promise<CompanyType> {
  const response = await api.patch(`/company/${companyId}/`, data)
  return response.data
}

export async function uploadImage(image: File, folder: "company_images" | "company_banners") {
  const formData = new FormData()
  formData.append("image", image)
  const response = await api.post("/files/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      folder,
    },
  })
  return response.data
}
