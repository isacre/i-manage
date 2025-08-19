"use client"
import FormFields from "@/components/formFields"
import Modal from "@/components/modal"
import { updateEmployee } from "@/services/company/employee"
import { EmployeeType, useEmployeeStore } from "@/stores/employee-store"
import { useUserStore } from "@/stores/user-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
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
    email: z.string().email({ message: "Email inválido" }),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  const editEmployee = useEmployeeStore((state) => state.update)
  const user = useUserStore((state) => state.user)
  const t = useTranslations("Admin")

  function onSubmit(data: any) {
    if (!user?.company?.id || !employee) return
    updateEmployee(employee.id.toString(), data, user.company.id)
      .then((updatedEmployee) => {
        setOpen(false)
        toast.success("Funcionário atualizado com sucesso")
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
    <Modal isOpen={isOpen} setOpen={setOpen} title={t("Employees.modals.edit.title")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormFields.TextField
          id="name"
          label={t("Employees.modals.edit.name")}
          register={register}
          error={errors.name?.message}
        />
        <FormFields.TextField
          id="email"
          label={t("Employees.modals.edit.email")}
          register={register}
          error={errors.email?.message}
        />
        <div className="flex justify-end space-x-4 pt-4">
          <FormFields.Button
            background="bg-transparent"
            color="text-gray-500"
            onClickFn={() => setOpen(false)}
            text={t("Employees.modals.edit.cancel")}
            backgroundHover={false}
          />
          <FormFields.Button text={t("Employees.modals.edit.submit")} onClickFn={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Modal>
  )
}
