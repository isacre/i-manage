import { CompanyType } from "../types"
import { create } from "zustand"

interface CompanyStore {
  company: CompanyType | null
  update: (company: CompanyType) => void
}
export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  update: (company) => set(() => ({ company })),
}))
