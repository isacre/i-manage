"use client"
import FormFields from "../../../../../../components/formFields"
import Modal from "../../../../../../components/modal"
import useEmployees from "../../../../../../hooks/useEmployees"
import { registerEmployee } from "../../../../../../services/company/employee"
import { useEmployeeStore } from "../../../../../../stores/employee-store"
import { useUserStore } from "../../../../../../stores/user-store"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
export default function RegisterEmployeeModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
  })
  const t = useTranslations("ADMIN")

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
      toast.success(t("Employees.modals.register.success"))
      addEmployee(employee)
    })
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={t("Employees.modals.register.title")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormFields.TextField
          id="name"
          label={t("Employees.modals.register.name")}
          register={register}
          error={errors.name?.message}
        />
        <FormFields.TextField
          id="email"
          label={t("Employees.modals.register.email")}
          register={register}
          error={errors.email?.message}
        />
        <div className="flex justify-end space-x-4 pt-4">
          <FormFields.Button
            background="bg-transparent"
            color="text-gray-500"
            onClickFn={() => setOpen(false)}
            text={t("Employees.modals.register.cancel")}
            backgroundHover={false}
          />
          <FormFields.Button text={t("Employees.modals.register.submit")} onClickFn={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Modal>
  )
}
