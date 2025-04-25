import { create } from "zustand"

export declare type ServiceType = {
  id: number
  name: string
  price: number
  max_duration: number
  required_employee_amount: number
  capable_employees: number[]
  description: string
}
interface ServiceStore {
  services: ServiceType[]
  update: (services: ServiceType[]) => void
  add: (service: ServiceType) => void
  remove: (id: number) => void
}
export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  update: (services) => set(() => ({ services })),
  add: (service) => set((state) => ({ services: [...state.services, service] })),
  remove: (id) => set((state) => ({ services: state.services.filter((service) => service.id !== id) })),
}))
