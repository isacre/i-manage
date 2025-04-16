import { EmployeeType } from "@/stores/employee-store";
import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface EmployeeProps {
  employee: EmployeeType;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Employee({ employee, onEdit, onDelete }: EmployeeProps) {
  return (
    <tr className="h-20 px-6 hover:bg-gray-50 transition-colors border-b border-gray-200">
      <td className="px-6 w-3/5">{employee.name}</td>
      <td className="px-6 w-3/5">{employee.phone}</td>
      <td className="px-6 w-1/5">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="text-gray-600 hover:text-red-600 transition-colors">
              <FiEdit2 size={18} className="cursor-pointer" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200">
            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 cursor-pointer" onClick={onEdit}>
              <FiEdit2 size={16} />
              <span>Editar</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 cursor-pointer" onClick={onDelete}>
              <FiTrash2 size={16} />
              <span>Excluir</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </td>
    </tr>
  );
}
