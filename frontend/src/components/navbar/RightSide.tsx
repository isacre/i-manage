import NavbarButton from "./Button"
import { HeaderMenu } from "./navbar"

interface Props {
  menus?: HeaderMenu[]
}
export default function RightSide({ menus }: Props) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {menus?.map((menu) => {
        if (menu.show !== false) {
          return <NavbarButton key={menu.label} menu={menu} />
        }
        return null
      })}
    </div>
  )
}
