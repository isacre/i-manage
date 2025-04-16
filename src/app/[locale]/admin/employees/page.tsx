"use client";
import { useEmployeeStore, EmployeeType } from "@/stores/employee-store";
import { useState } from "react";
import Employee from "./employee";
import RegisterEmployeeModal from "./modals/register";
import EditEmployeeModal from "./modals/edit";
import DeleteEmployeeModal from "./modals/delete";
import useEmployees from "@/hooks/useEmployees";
import Table from "@/components/table";

export default function Employees() {
  const { employees, employeesLoading } = useEmployees();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (employee: EmployeeType) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee: EmployeeType) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <RegisterEmployeeModal AddEmployeeIsOpen={isRegisterModalOpen} setAddEmployeeIsOpen={setIsRegisterModalOpen} />
      {selectedEmployee && (
        <>
          <EditEmployeeModal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} employee={selectedEmployee} />
          <DeleteEmployeeModal isOpen={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} employee={selectedEmployee} />
        </>
      )}
      <Table
        loading={employeesLoading}
        headers={["Nome", "Telefone", "Ações"]}
        data={employees}
        title="Funcionários"
        actionButton={{ label: "Cadastrar Funcionário", onClick: () => setIsRegisterModalOpen(true) }}
      >
        {employees.map((employee) => (
          <Employee key={employee.id} employee={employee} onEdit={() => handleEdit(employee)} onDelete={() => handleDelete(employee)} />
        ))}
      </Table>
    </div>
  );
}
