"use client";

import Modal from "@/components/modal";
import StatusBadge from "@/components/status-badge";
import Table from "@/components/table";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-red-600 transition-colors">
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
    <>
      <Table
        title="Funcionários"
        headers={headers}
        data={employees}
        renderRow={renderRow}
        actionButton={{
          label: "Adicionar Funcionário",
          onClick: () => setIsModalOpen(true),
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Funcionário"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <input
              type="text"
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}
