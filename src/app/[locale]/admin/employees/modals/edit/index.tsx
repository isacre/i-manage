"use client";
import Modal from "@/components/modal";
import { updateEmployee } from "@/services/admin/employee";
import { useEmployeeStore } from "@/stores/employee-store";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EmployeeType } from "@/stores/employee-store";
import React from "react";

export default function EditEmployeeModal({ isOpen, setOpen, employee }: { isOpen: boolean; setOpen: (open: boolean) => void; employee: EmployeeType }) {
  const { register, handleSubmit, setValue } = useForm();
  const update = useEmployeeStore((state) => state.update);
  const user = useUserStore((state) => state.user);

  // Set initial values when modal opens
  React.useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("phone", employee.phone);
    }
  }, [employee, setValue]);

  function onSubmit(data: any) {
    if (!user?.company?.id) return;

    updateEmployee(employee.id.toString(), data, user.company.id)
      .then((updatedEmployee) => {
        setOpen(false);
        toast.success("Funcionário atualizado com sucesso");
        // Update the employee in the store
        const employees = useEmployeeStore.getState().employees;
        const updatedEmployees = employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp));
        update(updatedEmployees);
      })
      .catch(() => {
        toast.error("Erro ao atualizar funcionário");
      });
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title="Editar Funcionário">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Funcionário
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite o nome do funcionário"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                {...register("name")}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
