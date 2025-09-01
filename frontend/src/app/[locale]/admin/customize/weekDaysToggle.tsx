import { useCompanyStore } from "@/stores/company-store"
import { CompanyType, WeekDays } from "@/types"

export default function WorkDaysToggle() {
  const daysOfWeek = [
    { key: WeekDays.Sunday, label: "Sunday" },
    { key: WeekDays.Monday, label: "Monday" },
    { key: WeekDays.Tuesday, label: "Tuesday" },
    { key: WeekDays.Wednesday, label: "Wednesday" },
    { key: WeekDays.Thursday, label: "Thursday" },
    { key: WeekDays.Friday, label: "Friday" },
    { key: WeekDays.Saturday, label: "Saturday" },
  ]
  const { company, update } = useCompanyStore()

  const handleWorkDaysChange = (workDays: WeekDays[]) => {
    if (company) {
      update({ ...company, work_days: workDays } as CompanyType)
    }
  }

  const toggleDay = (day: WeekDays) => {
    if (company?.work_days.includes(day)) {
      handleWorkDaysChange(company?.work_days.filter((d) => d !== day))
    } else {
      handleWorkDaysChange([...(company?.work_days || []), day])
    }
  }

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm font-medium text-gray-700">Working Days</label>
      <div className="flex w-full flex-wrap gap-2">
        {daysOfWeek.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleDay(key)}
            className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              company?.work_days.includes(key)
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
