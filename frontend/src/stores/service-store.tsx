import { create } from "zustand"

export declare type ServiceType = {
  id: number
  name: string
  price: number
  max_duration: number
  required_employee_amount: number
  capable_employees: { id: number; name: string; email: string }[]
  description: string
}
interface ServiceStore {
  services: ServiceType[]
  update: (services: ServiceType[]) => void
  add: (service: ServiceType) => void
  remove: (id: number) => void
  updateCapableEmployees: (serviceId: number, capableEmployees: { id: number; name: string; email: string }[]) => void
}
export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  update: (services) => set(() => ({ services })),
  updateCapableEmployees: (serviceId: number, capableEmployees: { id: number; name: string; email: string }[]) => {
    const service = useServiceStore.getState().services.find((service) => service.id === serviceId)
    if (!service) return
    service.capable_employees = capableEmployees
    set((state) => ({ services: state.services.map((service) => (service.id === serviceId ? service : service)) }))
  },
  add: (service) => set((state) => ({ services: [...state.services, service] })),
  remove: (id) => set((state) => ({ services: state.services.filter((service) => service.id !== id) })),
}))
