"use client";
import Modal from "@/components/modal";
import { registerService } from "@/services/admin/services";
import { useServiceStore } from "@/stores/service-store";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterServiceModal({
  AddServiceIsOpen,
  setAddServiceIsOpen,
}: {
  AddServiceIsOpen: boolean;
  setAddServiceIsOpen: (open: boolean) => void;
}) {
  const { register, handleSubmit } = useForm();
  const add = useServiceStore((state) => state.add);
  const user = useUserStore((state) => state.user);

  function onSubmit(data: any) {
    registerService({ ...data, company: user?.company?.id }).then((service) => {
      setAddServiceIsOpen(false);
      toast.success("Serviço adicionado com sucesso");
      add(service);
    });
  }

  return (
    <div>
      <Modal isOpen={AddServiceIsOpen} setOpen={setAddServiceIsOpen} title="Adicionar Serviço">
        <div className="flex flex-col items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Serviços</h1>
          <input type="text" placeholder="Nome" {...register("name")} />
          <input type="text" placeholder="Descrição" {...register("description")} />
          <input type="text" placeholder="Preço" {...register("price")} />
          <input type="number" placeholder="Duração máxima" {...register("max_duration")} />
          <input type="number" placeholder="Quantidade de funcionários necessários" {...register("required_employee_amount")} />
          <Button onClick={handleSubmit(onSubmit)}>Adicionar</Button>
        </div>
      </Modal>
    </div>
  );
}
