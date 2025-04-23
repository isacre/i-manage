"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { iconClassName, labelClassName } from "./styles"
import { containerClassName } from "./styles"

interface Props {
  icon: React.ReactNode
  label: string
  link: string
}
export default function SidebarItem({ icon, label, link }: Props) {
  const isActive = usePathname() === link

  return (
    <Link href={link}>
      <div className={containerClassName(isActive)}>
        <div className={iconClassName(isActive)}>{icon}</div>
        <span className={labelClassName(isActive)}>{label}</span>
      </div>
    </Link>
  )
}
