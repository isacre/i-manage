"use client"
import Modal from "../../../../../../components/modal"
import { deleteEmployee } from "../../../../../../services/company/employee"
import { useEmployeeStore } from "../../../../../../stores/employee-store"
import { useUserStore } from "../../../../../../stores/user-store"
import { Button } from "@radix-ui/themes"
import { toast } from "react-toastify"
import { EmployeeType } from "../../../../../../stores/employee-store"
import FormFields from "../../../../../../components/formFields"
import { useTranslations } from "next-intl"
interface Props {
  isOpen: boolean
  setOpen: (open: boolean) => void
  employee: EmployeeType | null
}

export default function DeleteEmployeeModal({ isOpen, setOpen, employee }: Props) {
  const removeEmployee = useEmployeeStore((state) => state.remove)
  const user = useUserStore((state) => state.user)
  const t = useTranslations("ADMIN")

  function handleDelete() {
    if (!user?.company?.id || !employee) return
    deleteEmployee(employee.id.toString(), user.company.id)
      .then(() => {
        setOpen(false)
        toast.success(t("Employees.modals.delete.success"))
        removeEmployee(employee.id)
      })
      .catch(() => {
        toast.error(t("Employees.modals.delete.error"))
      })
  }

  if (!employee) return null
  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={t("Employees.modals.delete.title")}>
      <div className="space-y-6 p-2">
        <p className="text-gray-700">{t("Employees.modals.delete.message", { name: employee.name })}</p>
        <div className="flex justify-end pt-4">
          <FormFields.Button
            background="bg-transparent"
            color="text-gray-500"
            onClickFn={() => setOpen(false)}
            text={t("Employees.modals.delete.cancel")}
            backgroundHover={false}
          />
          <FormFields.Button
            background="bg-red-600"
            color="text-white"
            onClickFn={handleDelete}
            text={t("Employees.modals.delete.submit")}
            backgroundHover={false}
            padding="px-6 py-2"
          />
        </div>
      </div>
    </Modal>
  )
}
