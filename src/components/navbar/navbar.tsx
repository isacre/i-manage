import { UserType } from "@/stores/user-store"
import { CompanyType } from "@/types"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

interface Props {
  menus?: { href: string; label: string; active: boolean }[]
  setAuthModalState: (state: string | undefined) => void
  user: UserType | null
  company: CompanyType | null
}
export default function Navbar({ menus, user, company }: Props) {
  return (
    <header className="border-b px-4">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 lg:w-[80%]">
        <LeftSide menus={menus} company={company} />
        <RightSide user={user} />
      </div>
    </header>
  )
}
