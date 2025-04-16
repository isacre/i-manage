"use client";

import StatusBadge from "@/components/status-badge";
import Table from "@/components/table";
import { useTranslations } from "next-intl";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "Ativo" | "Inativo";
}

export default function EmployeesPage() {
  const t = useTranslations("Employees");

  // This would typically come from an API
  const employees: Employee[] = [
    {
      id: "1",
      name: "João Silva",
      role: "Atendente",
      phone: "(11) 91234-5678",
      email: "joao@mail.com",
      status: "Ativo",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      role: "Gerente",
      phone: "(21) 99876-5432",
      email: "maria@empresa.com",
      status: "Ativo",
    },
    {
      id: "3",
      name: "Paulo Sousa",
      role: "Vendedor",
      phone: "(31) 90000-1111",
      email: "paulo.sousa@empresa.com",
      status: "Inativo",
    },
  ];

  const headers = ["Nome", "Cargo", "Telefone", "Email", "Status", "Ações"];

  const renderRow = (employee: Employee) => (
    <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.role}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={employee.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex gap-3">
          <button className="text-gray-600 hover:text-red-600 transition-colors">
            <FiEdit2 size={18} />
          </button>
          <button className="text-gray-600 hover:text-red-600 transition-colors">
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <Table
      title="Funcionários"
      headers={headers}
      data={employees}
      renderRow={renderRow}
      actionButton={{
        label: "Adicionar Funcionário",
        onClick: () => {
          // Handle add employee
          console.log("Add employee clicked");
        },
      }}
    />
  );
}
