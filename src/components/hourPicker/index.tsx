import React from "react"

interface Props {
  loading: boolean
  availableHours: string[]
  selectedHour: string | undefined
  setSelectedHour: (hour: string) => void
}
export default function HourPicker({ loading, availableHours, selectedHour, setSelectedHour }: Props) {
  return (
    <>
      {loading ? (
        <div className="m-auto flex h-[200px] items-center justify-center text-center">Carregando...</div>
      ) : (
        <div className="grid grid-cols-6 gap-1 p-5">
          {availableHours.map((hour) => (
            <div
              className={`cursor-pointer rounded-md border p-2 text-center hover:bg-red-600 hover:text-white ${
                selectedHour === hour ? "bg-red-600 text-white" : ""
              }`}
              key={hour}
              onClick={() => setSelectedHour(hour)}
            >
              {hour}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
