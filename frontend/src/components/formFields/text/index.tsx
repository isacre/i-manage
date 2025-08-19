import React, { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  placeholder?: string
  register: UseFormRegister<any>
  error?: string
}

export default function TextField({ id, label, placeholder = "", register, error, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="block pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
        {...register(id)}
        {...props}
      />
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
