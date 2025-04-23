"use client"
import FormFields from "@/components/formFields"
import Modal from "@/components/modal"
import useEmployees from "@/hooks/useEmployees"
import { registerEmployee } from "@/services/admin/employee"
import { useEmployeeStore } from "@/stores/employee-store"
import { useUserStore } from "@/stores/user-store"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function RegisterEmployeeModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    phone: z.string().min(1, { message: "Telefone é obrigatório" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const addEmployee = useEmployeeStore((state) => state.add)
  const user = useUserStore((state) => state.user)

  function onSubmit(data: any) {
    registerEmployee(data, user?.company?.id || 0).then((employee) => {
      setOpen(false)
      toast.success("Funcionário adicionado com sucesso")
      addEmployee(employee)
    })
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Adicionar Funcionário">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormFields.TextField id="name" label="Nome do Funcionário" register={register} error={errors.name?.message} />
        <FormFields.TextField id="phone" label="Telefone" register={register} error={errors.phone?.message} />
        <div className="flex justify-end space-x-4 pt-4">
          <FormFields.Button
            background="bg-transparent"
            color="text-gray-500"
            onClickFn={() => setOpen(false)}
            text="Cancelar"
            backgroundHover={false}
          />
          <FormFields.Button text="Adicionar Funcionário" onClickFn={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Modal>
  )
}
