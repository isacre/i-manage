"use client"
import Navbar from "@/components/navbar/navbar"
import { AuthModalProvider } from "@/contexts/authModal/AuthModalContext"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import useUserMenus from "@/hooks/useUserMenus"
import { useUserStore } from "@/stores/user-store"
import "@radix-ui/themes/styles.css"
import "react-toastify/dist/ReactToastify.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { company } = useUpdateCompanyByDomain()
  const { user } = useUserStore()
  const { menus } = useUserMenus(user)

  return (
    <AuthModalProvider>
      <Navbar user={user} company={company} menus={menus} editMode={true} />
      <div className="m-auto lg:w-[78vw]">{children}</div>
    </AuthModalProvider>
  )
}
