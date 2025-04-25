"use client"
import FormFields from "@/components/formFields"
import Modal from "@/components/modal"
import { updateEmployee } from "@/services/company/employee"
import { EmployeeType, useEmployeeStore } from "@/stores/employee-store"
import { useUserStore } from "@/stores/user-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

interface Props {
  isOpen: boolean
  setOpen: (open: boolean) => void
  employee: EmployeeType | null
}

export default function EditEmployeeModal({ isOpen, setOpen, employee }: Props) {
  const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    phone: z.string().min(1, { message: "Telefone é obrigatório" }),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  const editEmployee = useEmployeeStore((state) => state.update)
  const user = useUserStore((state) => state.user)

  function onSubmit(data: any) {
    if (!user?.company?.id || !employee) return

    updateEmployee(employee.id.toString(), data, user.company.id)
      .then((updatedEmployee) => {
        setOpen(false)
        toast.success("Funcionário atualizado com sucesso")
        // Update the employee in the store
        const employees = useEmployeeStore.getState().employees
        const updatedEmployees = employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        editEmployee(updatedEmployees)
      })
      .catch(() => {
        toast.error("Erro ao atualizar funcionário")
      })
  }

  useEffect(() => {
    if (employee) {
      reset(employee)
    }
  }, [employee])

  if (!employee) return null
  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Editar Funcionário">
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
          <FormFields.Button text="Salvar Alterações" onClickFn={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Modal>
  )
}
