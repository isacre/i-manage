import { create } from "zustand"

export declare type EmployeeType = {
  id: number
  name: string
  email: string
  is_available: boolean
}
interface EmployeeStore {
  employees: EmployeeType[]
  update: (employees: EmployeeType[]) => void
  add: (employee: EmployeeType) => void
  remove: (id: number) => void
}
export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  update: (employees) => set(() => ({ employees })),
  add: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  remove: (id: number) => set((state) => ({ employees: state.employees.filter((employee) => employee.id !== id) })),
}))
