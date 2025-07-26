"use client"
import Row from "@/components/table/row"
import RowActions from "@/components/table/rowActions"
import { EmployeeType } from "@/stores/employee-store"

interface EmployeeProps {
  employee: EmployeeType
  onEdit: () => void
  onDelete: () => void
}

export default function Employee({ employee, onEdit, onDelete }: EmployeeProps) {
  return (
    <Row gridTemplateColumns="1fr 1fr 0.25fr">
      <div>{employee.name}</div>
      <div>{employee.email}</div>
      <RowActions onEdit={onEdit} onDelete={onDelete} />
    </Row>
  )
}
