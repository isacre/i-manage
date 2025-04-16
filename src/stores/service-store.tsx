import { create } from "zustand";

export declare type ServiceType = {
  id: number;
  name: string;
  price: number;
  max_duration: number;
  required_employee_amount: number;
  capable_employees: number[];
};
interface ServiceStore {
  services: ServiceType[];
  update: (services: ServiceType[]) => void;
}
export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  update: (services) => set(() => ({ services })),
}));
