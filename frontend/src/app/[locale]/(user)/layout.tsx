"use client"
import Navbar from "@/components/navbar/navbar"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import useUserMenus from "@/hooks/useUserMenus"
import { useUserStore } from "@/stores/user-store"
import "@radix-ui/themes/styles.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthModalProvider } from "../../../contexts/authModal/AuthModalContext"
import AuthModal from "./modals/auth"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { company } = useUpdateCompanyByDomain()
  const { user } = useUserStore()
  const { menus } = useUserMenus(user)

  return (
    <AuthModalProvider>
      <ToastContainer />
      <AuthModal />
      <Navbar user={user} company={company} menus={menus} />
      <div className="m-auto lg:w-[78vw]" style={{ ["--primary-color" as any]: company?.primary_color || "#2563eb" }}>
        {children}
      </div>
    </AuthModalProvider>
  )
}
