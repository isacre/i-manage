import { create } from "zustand";

export declare type EmployeeType = {
  id: number;
  name: string;
  phone: string;
  is_available: boolean;
};
interface EmployeeStore {
  employees: EmployeeType[];
  update: (employees: EmployeeType[]) => void;
}
export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  update: (employees) => set(() => ({ employees })),
}));
