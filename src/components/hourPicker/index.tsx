import React, { useEffect } from "react"

interface Props {
  loading: boolean
  availableHours: string[]
  selectedHour: string | undefined
  setSelectedHour: (hour: string | undefined) => void
}
export default function HourPicker({ loading, availableHours, selectedHour, setSelectedHour }: Props) {
  useEffect(() => {
    if (selectedHour && availableHours.indexOf(selectedHour) === -1) {
      setSelectedHour(undefined)
    }
  }, [availableHours])
  return (
    <>
      {loading && <div className="m-auto flex h-[200px] items-center justify-center text-center">Carregando...</div>}
      {!loading && availableHours.length > 0 && (
        <div className="my-2 grid max-h-[400px] grid-cols-6 gap-1 overflow-y-auto p-5">
          {availableHours.map((hour) => (
            <div
              className={`cursor-pointer rounded-md border p-2 text-center hover:bg-red-600 hover:text-white ${
                selectedHour === hour ? "bg-red-600 text-white" : "bg-white text-black"
              }`}
              key={hour}
              onClick={() => setSelectedHour(hour)}
            >
              {hour}
            </div>
          ))}
        </div>
      )}
      {!loading && availableHours.length === 0 && (
        <div className="m-auto flex h-[200px] items-center justify-center text-center">Nenhum horário disponível</div>
      )}
    </>
  )
}
