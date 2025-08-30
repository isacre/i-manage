import React, { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ id, label, placeholder = "", value, onChange, ...props }: Props) {
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
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
