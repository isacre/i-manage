"use client"
import { EmployeeType } from "@/stores/employee-store"
import { useState } from "react"
import Employee from "./employee"
import RegisterEmployeeModal from "./modals/register"
import EditEmployeeModal from "./modals/edit"
import DeleteEmployeeModal from "./modals/delete"
import useEmployees from "@/hooks/useEmployees"
import TableComponent from "@/components/table"
import { useTranslations } from "next-intl"

export default function Employees() {
  const t = useTranslations("Admin")
  const { employees, employeesLoading } = useEmployees()
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function handleEditModal(employee: EmployeeType) {
    setSelectedEmployee(employee)
    setIsEditModalOpen(true)
  }

  function handleDeleteModal(employee: EmployeeType) {
    setSelectedEmployee(employee)
    setIsDeleteModalOpen(true)
  }

  return (
    <div>
      <RegisterEmployeeModal isOpen={isRegisterModalOpen} setOpen={setIsRegisterModalOpen} />
      <EditEmployeeModal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} employee={selectedEmployee} />
      <DeleteEmployeeModal isOpen={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} employee={selectedEmployee} />
      <TableComponent.Root>
        <TableComponent.TopRow
          title={t("Employees.title")}
          actionButton={[{ label: t("Employees.button"), onClick: () => setIsRegisterModalOpen(true) }]}
        />

        <TableComponent.Grid
          itemsAmount={employees.length}
          headers={[t("Employees.headers.name"), t("Employees.headers.email"), t("Employees.headers.actions")]}
          loading={employeesLoading}
          gridTemplateColumns="1fr 1fr 0.25fr"
        >
          {employees.map((employee) => (
            <Employee
              employee={employee}
              onEdit={() => handleEditModal(employee)}
              onDelete={() => handleDeleteModal(employee)}
              key={employee.id}
            />
          ))}
        </TableComponent.Grid>
      </TableComponent.Root>
    </div>
  )
}
