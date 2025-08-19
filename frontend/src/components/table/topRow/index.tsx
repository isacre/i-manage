import React from "react"
import { FiPlus } from "react-icons/fi"
import * as s from "./styles"

type ActionButton = {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  iconPosition?: "left" | "right" | "none"
}
interface TopRowProps {
  title: string
  actionButton?: ActionButton[]
}
export default function TopRow({ title, actionButton }: TopRowProps) {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <div>
        {actionButton?.map(({ label, onClick, icon, iconPosition = "left" }) => (
          <button key={label} onClick={onClick} className={s.button}>
            {iconPosition === "left" && (icon || <FiPlus size={20} />)}
            <span>{label}</span>
            {iconPosition === "right" && (icon || <FiPlus size={20} />)}
          </button>
        ))}
      </div>
    </div>
  )
}
