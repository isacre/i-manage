import { Menu } from "@/types"
import React from "react"

interface Props {
  menu: Menu
}
export default function MenuComponent({ menu }: Props) {
  const { text, link, onClick } = menu
  return <a className="cursor-pointer hover:text-black">{text}</a>
}
