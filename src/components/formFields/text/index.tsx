import React from "react"
import { FieldValues } from "react-hook-form"
import { UseFormRegister } from "react-hook-form"

interface Props {
  id: string
  label?: string
  placeholder?: string
  register: UseFormRegister<any>
  error?: string
}

export default function TextField({ id, label, placeholder = "", register, error }: Props) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
        {...register(id)}
      />
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
