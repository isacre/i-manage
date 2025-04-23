import { DropdownMenu } from "@radix-ui/themes"
import React from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import * as s from "./styles"

interface RowActionsProps {
  onEdit: () => void
  onDelete: () => void
}

export default function RowActions({ onEdit, onDelete }: RowActionsProps) {
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
          <span>Editar</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={onDelete} className={s.dropdownItem}>
          <FiTrash2 size={16} />
          <span>Excluir</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
