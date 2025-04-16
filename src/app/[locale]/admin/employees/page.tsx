"use client";
import { useEmployeeStore } from "@/stores/employee-store";
import { useUserStore } from "@/stores/user-store";
import { Button, Table } from "@radix-ui/themes";
import { useState } from "react";
import Employee from "./employee";
import RegisterEmployeeModal from "./modals/register";
import useEmployees from "@/hooks/useEmployees";

export default function Employees() {
  const { employeesLoading, employees } = useEmployees();

  const [AddEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <RegisterEmployeeModal AddEmployeeIsOpen={AddEmployeeIsOpen} setAddEmployeeIsOpen={setAddEmployeeIsOpen} />
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <Button onClick={() => setAddEmployeeIsOpen(true)}>Adicionar Funcionário</Button>
      </div>
      <Table.Root className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Telefone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Editar</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Excluir</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {employees.map((employee) => (
            <Employee key={employee.id} employee={employee} />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
