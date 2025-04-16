import { EmployeeType } from "@/stores/employee-store";
import { Button, Table } from "@radix-ui/themes";
import React from "react";

export default function Employee({ employee }: { employee: EmployeeType }) {
  return (
    <Table.Row>
      <Table.Cell>{employee.name}</Table.Cell>
      <Table.Cell>{employee.phone}</Table.Cell>
      <Table.Cell>
        <Button color="tomato" className="bg-red-600 text-white rounded-full">
          Editar
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button color="tomato" className="bg-red-600 text-white rounded-full">
          Excluir
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
