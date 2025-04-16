import { CompanyType, Roles } from "@/types";
import { create } from "zustand";

export declare type UserType = {
  name: string;
  email: string;
  phone: string;
  company: null | CompanyType;
  role: Roles;
  is_active: boolean;
};
interface UserStore {
  user: UserType | null;
  update: (user: UserType) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  update: (user) => set(() => ({ user })),
}));
