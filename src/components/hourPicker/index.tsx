import React, { useEffect } from "react"
import { useTranslations } from "next-intl"

interface Props {
  loading: boolean
  availableHours: string[]
  selectedHour: string | undefined
  setSelectedHour: (hour: string | undefined) => void
}
export default function HourPicker({ loading, availableHours, selectedHour, setSelectedHour }: Props) {
  const t = useTranslations("Common")
  const tBooking = useTranslations("Booking")

  useEffect(() => {
    if (selectedHour && availableHours.indexOf(selectedHour) === -1) {
      setSelectedHour(undefined)
    }
  }, [availableHours])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="text-gray-600">{t("Loading")}</p>
        </div>
      </div>
    )
  }

  if (availableHours.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <span className="text-xl text-gray-400">🕐</span>
          </div>
          <p className="font-medium text-gray-600">{tBooking("noAvailableHours")}</p>
          <p className="text-sm text-gray-500">Try selecting a different date</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {availableHours.map((hour) => (
          <button
            key={hour}
            onClick={() => setSelectedHour(hour)}
            className={`rounded-lg border p-3 text-sm font-medium transition-all duration-200 ${
              selectedHour === hour
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
            } `}
          >
            {hour}
          </button>
        ))}
      </div>
      {selectedHour && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected time: <span className="font-medium text-blue-600">{selectedHour}</span>
          </p>
        </div>
      )}
    </div>
  )
}
