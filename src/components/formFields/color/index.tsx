import React from "react"
import { UseFormRegister } from "react-hook-form"

interface Props {
  id: string
  label?: string
  register: UseFormRegister<any>
  error?: string
  defaultValue?: string
}

export default function ColorField({ id, label, register, error, defaultValue = "#000000" }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="block pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          defaultValue={defaultValue}
          className="h-10 w-16 cursor-pointer rounded-lg border border-gray-300 bg-white transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          {...register(id)}
        />
        <input
          type="text"
          defaultValue={defaultValue}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          {...register(id)}
          placeholder="#000000"
        />
      </div>
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
