import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { HeaderMenu } from "./navbar"
import clsx from "clsx"
import NavbarButton from "./Button"

interface Props {
  menus?: HeaderMenu[]
}
export default function RightSide({ menus }: Props) {
  const router = useRouter()

  function getBackgroundColor(buttonStyle: string) {
    if (buttonStyle === "ghost") {
      return "bg-transparent"
    }
    return "bg-red-500"
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      {menus?.map((menu) => <NavbarButton key={menu.label} menu={menu} />)}
    </div>
  )
}
