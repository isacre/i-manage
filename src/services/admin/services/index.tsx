import { ServiceType } from "@/stores/service-store"
import { api } from ".."

export async function registerService(data: { name: string; price: number; company: number }): Promise<ServiceType> {
  const response = await api.post("/service/", { ...data, is_active: true })
  return response.data
}

export async function getServices(company: number): Promise<ServiceType[]> {
  const response = await api.get("/service/", { params: { company } })
  return response.data
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`/service/${id}/`)
}

export async function updateService(
  id: string,
  data: { name: string; price: number; company: number },
): Promise<ServiceType> {
  const response = await api.put(`/service/${id}/`, { ...data, is_active: true })
  return response.data
}
