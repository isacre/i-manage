"use client"
import Button from "@/components/formFields/button"
import Modal from "@/components/modal"
import useEmployees from "@/hooks/useEmployees"
import { patchCompanyCapableEmployees } from "@/services/company/services"
import { ServiceType, useServiceStore } from "@/stores/service-store"
import { ModalProps } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"

interface Props extends ModalProps {
  service: ServiceType | null
}

export default function CapableEmployeesModal({ isOpen, setOpen, service }: Props) {
  const t = useTranslations("Admin.Services")
  const tCommon = useTranslations("Common")
  const [capableEmployees, setCapableEmployees] = useState<number[]>([])
  const { employees, employeesLoading } = useEmployees(isOpen)
  const { updateCapableEmployees } = useServiceStore()

  const handleCheckBoxToggle = useCallback(
    (employeeId: number) => {
      if (capableEmployees.includes(employeeId)) {
        setCapableEmployees(capableEmployees.filter((id) => id !== employeeId))
      } else {
        setCapableEmployees([...capableEmployees, employeeId])
      }
    },
    [capableEmployees],
  )

  const handleSave = useCallback(() => {
    if (!service) return
    patchCompanyCapableEmployees(service.id, capableEmployees)
      .then((res) => {
        toast.success(t("capableEmployeesSuccess"))
        updateCapableEmployees(
          service.id,
          employees.filter((employee) => res.capable_employees.includes(employee.id)),
        )
      })
      .catch((err) => {
        toast.error(t("capableEmployeesError"))
      })
      .finally(() => {
        setOpen(false)
      })
  }, [service, capableEmployees, employees, updateCapableEmployees, t, setOpen])

  useEffect(() => {
    if (!service) return
    setCapableEmployees(service.capable_employees.map((employee) => employee.id))
  }, [service, isOpen])

  return (
    <Modal
      loadingDependencies={[employeesLoading]}
      isOpen={isOpen}
      setOpen={setOpen}
      title={t("capableEmployeesTitle", { name: service?.name })}
    >
      <div className="flex flex-col gap-2">
        {employees.map((employee) => (
          <div onClick={() => handleCheckBoxToggle(employee.id)} key={employee.id} className="flex items-center gap-2">
            <input type="checkbox" onChange={() => {}} checked={capableEmployees.includes(employee.id)} />
            {employee.name}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button text={tCommon("Save")} onClickFn={() => handleSave()} />
      </div>
    </Modal>
  )
}
