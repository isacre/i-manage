import React from "react"
import Button from "../formFields/button"
import Image from "next/image"
import userDefaultImage from "@/assets/defaultAvatar.jpg"
import { twMerge } from "tailwind-merge"
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
  const employeesList = [{ id: undefined, name: "Sem preferência", email: "" }, ...capableEmployees]
  return (
    <div className="relative mx-5">
      {!selectingEmployee ? (
        <div className="left-0 mt-4 flex h-[80px] items-center justify-between gap-2 rounded-lg bg-white px-4">
          <>
            <div className="text-sm text-gray-500">
              <b>Funcionário:</b> {selectedEmployee || "Sem preferência"}
            </div>
            <Button onClickFn={() => setSelectingEmployee(true)} text="Alterar" />
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
                setSelectedEmployee(employee.name)
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
