import { DropdownMenu } from "@radix-ui/themes"
import React from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import * as s from "./styles"
import { useTranslations } from "next-intl"
interface RowActionsProps {
  onEdit: () => void
  onDelete: () => void
  extraActions?: { label: string; onClick: () => void; icon?: React.ReactNode }[]
}

export default function RowActions({ onEdit, onDelete, extraActions }: RowActionsProps) {
  const t = useTranslations("Admin")
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className={s.actionButton}>
          <FiEdit2 size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={s.dropdownContent}>
        <DropdownMenu.Item onClick={onEdit} className={s.dropdownItem}>
          <FiEdit2 size={16} />
          <span>{t("Employees.actions.edit")}</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={onDelete} className={s.dropdownItem}>
          <FiTrash2 size={16} />
          <span>{t("Employees.actions.delete")}</span>
        </DropdownMenu.Item>
        {extraActions?.map((action) => (
          <DropdownMenu.Item onClick={action.onClick} className={s.dropdownItem} key={action.label}>
            {action.icon || <FiEdit2 size={16} />}
            <span>{action.label}</span>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
