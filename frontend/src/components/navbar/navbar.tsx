import { UserType } from "@/stores/user-store"
import { CompanyType } from "@/types"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import { useTranslations } from "next-intl"
import { useAuthModal } from "@/contexts/authModal/AuthModalContext"

export type HeaderMenu = {
  href: string
  label: string
  onClick?: () => void
  buttonStyle?: "default" | "ghost" | "outline"
  show?: boolean
}
interface Props {
  menus?: HeaderMenu[]
  user: UserType | null
  company: CompanyType | null
  editMode?: boolean
}
export default function Navbar({ menus, user, company, editMode = false }: Props) {
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
        <LeftSide company={company} menus={visibleMenus} editMode={editMode} />
        <RightSide menus={visibleMenus} editMode={editMode} />
      </div>
    </header>
  )
}
