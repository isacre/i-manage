"use client";
import Modal from "@/components/modal";
import useEmployees from "@/hooks/useEmployees";
import { registerEmployee } from "@/services/admin/employee";
import { useEmployeeStore } from "@/stores/employee-store";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterEmployeeModal({
  AddEmployeeIsOpen,
  setAddEmployeeIsOpen,
}: {
  AddEmployeeIsOpen: boolean;
  setAddEmployeeIsOpen: (open: boolean) => void;
}) {
  const { register, handleSubmit } = useForm();
  const add = useEmployeeStore((state) => state.add);
  const user = useUserStore((state) => state.user);

  function onSubmit(data: any) {
    registerEmployee(data, user?.company?.id || 0).then((employee) => {
      setAddEmployeeIsOpen(false);
      toast.success("Funcionário adicionado com sucesso");
      add(employee);
    });
  }

  return (
    <div>
      <Modal isOpen={AddEmployeeIsOpen} setOpen={setAddEmployeeIsOpen} title="Adicionar Funcionário">
        <div className="flex flex-col items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Funcionários</h1>
          <input type="text" placeholder="Nome" {...register("name")} />
          <input type="text" placeholder="Telefone" {...register("phone")} />
          <Button onClick={handleSubmit(onSubmit)}>Adicionar</Button>
        </div>
      </Modal>
    </div>
  );
}
