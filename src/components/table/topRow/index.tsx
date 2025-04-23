import React from "react"
import { FiPlus } from "react-icons/fi"
import * as s from "./styles"

interface TopRowProps {
  title: string
  actionButton?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
    iconPosition?: "left" | "right"
  }
}
export default function TopRow({ title, actionButton }: TopRowProps) {
  const buttonIcon = actionButton?.icon || <FiPlus size={20} />

  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <button onClick={actionButton?.onClick} className={s.button}>
        {actionButton?.iconPosition === "left" && buttonIcon}
        {actionButton && <span>{actionButton?.label}</span>}
        {actionButton?.iconPosition === "right" && buttonIcon}
      </button>
    </div>
  )
}
