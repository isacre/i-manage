import { ServiceType } from "@/stores/service-store"
import { api } from "../index"

export async function registerService(data: { name: string; price: number; company: number }): Promise<ServiceType> {
  const response = await api.post("/service/", { ...data, is_active: true })
  return response.data
}

export async function getServices(company: number): Promise<ServiceType[]> {
  const response = await api.get("/service/", { params: { company } })
  return response.data
}

export async function getService(id: string): Promise<ServiceType> {
  const response = await api.get(`/service/${id}/`)
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

export async function getAvailableHours(
  service: number,
  date: string,
  preferred_employee: string | undefined,
): Promise<{ available_slots: string[]; capable_employees: { id: number; name: string; email: string }[] }> {
  const response = await api.get(`/booking/${service}/getAvailableHours/`, {
    params: { date, preferred_employee },
  })
  return response.data
}

export async function getCompanyServices(identifier: string) {
  const response = await api.get(`/service/get_services_by_identifier/`, { params: { identifier } })
  return response.data
}

export async function patchCompanyCapableEmployees(
  serviceId: number,
  capable_employees: number[],
): Promise<{ capable_employees: number[] }> {
  const response = await api.patch(`/service/${serviceId}/`, { capable_employees })
  return response.data
}
