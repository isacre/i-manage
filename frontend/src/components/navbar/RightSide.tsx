import { useRef, useState } from "react"
import NavbarButton from "./Button"
import { HeaderMenu } from "./navbar"
import { cn } from "@/lib/utils"
import { useCompanyStore } from "@/stores/company-store"
import { CompanyType } from "@/types"
import useDebounce from "@/hooks/useDebounce"

interface Props {
  menus?: HeaderMenu[]
  editMode?: boolean
}
export default function RightSide({ menus, editMode = false }: Props) {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const { update, company } = useCompanyStore()
  const [color, setColor] = useState(company?.primary_color)

  // Debounce the color change to avoid multiple updates on zustand
  useDebounce(
    () => {
      update({ ...company, primary_color: color } as CompanyType)
    },
    200,
    [color],
  )

  return (
    <div onClick={() => editMode && colorInputRef.current?.click()} className="relative">
      <div className={cn("hidden items-center gap-2 md:flex", editMode && "pointer-events-none")}>
        {editMode && <input ref={colorInputRef} type="color" onChange={(e) => setColor(e.target.value)} />}

        {menus?.map((menu) => {
          if (menu.show !== false) {
            return <NavbarButton key={menu.label} menu={menu} />
          }
          return null
        })}
      </div>
    </div>
  )
}
