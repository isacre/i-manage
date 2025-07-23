"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import userDefaultImage from "@/assets/defaultAvatar.jpg"
import { twMerge } from "tailwind-merge"
import { useTranslations } from "next-intl"

interface Props {
  selectedEmployee: string | undefined
  setSelectedEmployee: (employee: string | undefined) => void
  capableEmployees: { id: number; name: string; email: string }[]
  selectingEmployee: boolean
  setSelectingEmployee: (selecting: boolean) => void
}
export default function EmployeePicker({
  selectedEmployee,
  setSelectedEmployee,
  capableEmployees,
  selectingEmployee,
  setSelectingEmployee,
}: Props) {
  const t = useTranslations("Booking")
  const tCommon = useTranslations("Common")
  const employeesList = [{ id: undefined, name: t("noPreference"), email: "" }, ...capableEmployees]
  const [employeeName, setemployeeName] = useState(t("noPreference"))

  useEffect(() => {
    const employee = employeesList.find((employee) => employee.id === Number(selectedEmployee))
    if (employee) {
      setemployeeName(employee.name)
    } else {
      setemployeeName(t("noPreference"))
    }
  }, [selectedEmployee, t])

  return (
    <div className="space-y-3">
      {!selectingEmployee ? (
        <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <span className="text-sm font-medium text-gray-600">👤</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("employee")}</p>
              <p className="font-medium text-gray-900">{employeeName}</p>
            </div>
          </div>
          <Button onClick={() => setSelectingEmployee(true)} variant="outline" size="sm">
            {tCommon("Change")}
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-700">Select Employee</h5>
            <Button onClick={() => setSelectingEmployee(false)} variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
          <div className="max-h-48 overflow-y-auto rounded-lg border bg-white shadow-sm">
            {employeesList.map((employee, index) => (
              <div
                className={twMerge(
                  "flex cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-gray-50",
                  index !== employeesList.length - 1 && "border-b border-gray-100",
                )}
                key={`${employee.id}-${employee.name}`}
                onClick={() => {
                  setSelectedEmployee(employee.id?.toString() || undefined)
                  setSelectingEmployee(false)
                }}
              >
                {employee.id ? (
                  <Image src={userDefaultImage} alt={employee.name} width={32} height={32} className="rounded-full" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs text-gray-500">⚪</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  {employee.email && <p className="text-xs text-gray-500">{employee.email}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
