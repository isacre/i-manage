import { ServiceType } from "@/stores/service-store";
import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ServiceProps {
  service: ServiceType;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Service({ service, onEdit, onDelete }: ServiceProps) {
  return (
    <tr className="h-20 px-6 hover:bg-gray-50 transition-colors">
      <td className="px-6 w-3/5">{service.name}</td>
      <td className="px-6 w-3/5">R${service.price}</td>
      <td className="px-6 w-1/5">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="text-gray-600 hover:text-red-600 transition-colors">
              <FiEdit2 size={18} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200">
            <DropdownMenu.Item onClick={onEdit} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 cursor-pointer">
              <FiEdit2 size={16} />
              <span>Editar</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={onDelete} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 cursor-pointer">
              <FiTrash2 size={16} />
              <span>Excluir</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </td>
    </tr>
  );
}
