import { Menu } from "@/types"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  menu: Menu
}
export default function MenuComponent({ menu }: Props) {
  const { text, link, onClick } = menu
  const Icon = menu.icon ? <menu.icon /> : null
  const router = useRouter()
  function handleClick() {
    if (onClick) {
      onClick()
    }
    if (link) {
      router.push(link)
    }
  }
  return (
    <button className="flex cursor-pointer items-center gap-2 hover:text-red-400" onClick={handleClick}>
      {Icon}
      {text}
    </button>
  )
}
