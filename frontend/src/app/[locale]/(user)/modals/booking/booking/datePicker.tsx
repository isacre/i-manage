import DayPicker from "@/components/dayPicker"
import EmployeePicker from "@/components/employeePicker"
import HourPicker from "@/components/hourPicker"
import { useAvailableHours } from "@/hooks/useAvailableHours"
import { useCompanyStore } from "@/stores/company-store"
import { SetStateFn } from "@/types"
import { calcWeekDayDiff } from "@/utils"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

interface Props {
  clickedDate: dayjs.Dayjs | undefined
  setClickedDate: SetStateFn<dayjs.Dayjs | undefined>
  selectedEmployee: string | undefined
  setSelectedEmployee: (employee: string | undefined) => void
  selectedServiceId: number | null
  selectedHour: string | undefined
  setSelectedHour: SetStateFn<string | undefined>
}
export default function DatePicker({
  clickedDate,
  setClickedDate,
  selectedEmployee,
  setSelectedEmployee,
  selectedServiceId,
  selectedHour,
  setSelectedHour,
}: Props) {
  const [DateLabel, setDateLabel] = useState("")
  const [selectingEmployee, setSelectingEmployee] = useState(false)
  const { company } = useCompanyStore()
  const { availableHours, capableEmployees, isLoading } = useAvailableHours(
    selectedServiceId,
    clickedDate?.format("YYYY-MM-DD") || "",
    selectedEmployee,
  )
  const t = useTranslations("Time.Months")

  useEffect(() => {
    setSelectedHour(undefined)
  }, [clickedDate, selectedEmployee])

  // If current day is not a work day, set the next work day as the clicked date
  useEffect(() => {
    const currentWeekDay = dayjs().tz("America/Sao_Paulo").day() - 1
    if (company?.work_days.indexOf(currentWeekDay) === -1) {
      setClickedDate(clickedDate?.add(calcWeekDayDiff(currentWeekDay, company?.work_days), "day"))
    }
  }, [selectedServiceId])

  return (
    <div className="flex h-full flex-col p-6">
      <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
        {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
      </h3>

      <div className="flex-1 space-y-6 overflow-y-auto">
        <DayPicker setMonthLabel={setDateLabel} clickedDate={clickedDate} setClickedDate={setClickedDate} />
        <label className="text-sm font-medium text-gray-700">Select Employee (Optional)</label>
        <EmployeePicker
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          capableEmployees={capableEmployees}
          selectingEmployee={selectingEmployee}
          setSelectingEmployee={setSelectingEmployee}
        />
        {!selectingEmployee && (
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Select Time</label>
            <HourPicker
              loading={isLoading}
              availableHours={availableHours}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />
          </div>
        )}
      </div>
    </div>
  )
}
