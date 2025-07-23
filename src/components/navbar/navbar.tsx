import { UserType } from "@/stores/user-store"
import { CompanyType } from "@/types"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import { useTranslations } from "next-intl"
import { useAuthModal } from "@/app/[locale]/(user)/AuthModalContext"

export type HeaderMenu = {
  href: string
  label: string
  onClick?: () => void
  buttonStyle?: "default" | "ghost" | "outline"
}
interface Props {
  menus?: HeaderMenu[]
  setAuthModalState: (state: string | undefined) => void
  user: UserType | null
  company: CompanyType | null
}
export default function Navbar({ menus, user, company }: Props) {
  const t = useTranslations("Header")
  const { setAuthModalState } = useAuthModal()
  const loggedOutMenus: HeaderMenu[] = [
    {
      href: "",
      label: t("login"),
      onClick: () => setAuthModalState("login"),
      buttonStyle: "ghost",
    },
    {
      href: "",
      label: t("register"),
      onClick: () => setAuthModalState("register"),
      buttonStyle: "outline",
    },
  ]

  const visibleMenus = user ? menus : loggedOutMenus

  return (
    <header className="border-b px-4">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 lg:w-[80%]">
        <LeftSide company={company} menus={visibleMenus} />
        <RightSide menus={visibleMenus} />
      </div>
    </header>
  )
}
