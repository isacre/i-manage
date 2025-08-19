import React, { SelectHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label?: string
  register: UseFormRegister<any>
  error?: string
  options: { value: string; label: string }[]
}

export default function SelectField({ id, label, register, error, options, ...props }: Props) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
        {...register(id)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
