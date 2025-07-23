"use client"
import React, { useEffect, useState } from "react"
import Button from "../formFields/button"
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
    <div className="relative mx-5">
      {!selectingEmployee ? (
        <div className="left-0 mt-4 flex h-[80px] items-center justify-between gap-2 rounded-lg bg-white px-4">
          <>
            <div className="text-sm text-gray-500">
              <b>{t("employee")}:</b> {employeeName}
            </div>
            <Button onClickFn={() => setSelectingEmployee(true)} text={t("Common.Change")} />
          </>
        </div>
      ) : (
        <div className="absolute top-[90%] left-0 mt-4 h-fit w-full overflow-y-auto rounded-lg bg-white">
          {employeesList.map((employee, index) => (
            <div
              className={twMerge(
                "flex cursor-pointer items-center gap-4 p-4 hover:bg-gray-100",
                index !== employeesList.length - 1 && "border-b-1 border-gray-200",
              )}
              key={`${employee.id}-${employee.name}`}
              onClick={() => {
                setSelectedEmployee(employee.id?.toString() || undefined)
                setSelectingEmployee(false)
              }}
            >
              {employee.id && (
                <Image src={userDefaultImage} alt={employee.name} width={30} height={30} className="rounded-full" />
              )}
              <p>{employee.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
