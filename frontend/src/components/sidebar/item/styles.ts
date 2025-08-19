import { twMerge } from "tailwind-merge"

export const iconClassName = (isActive: boolean) =>
  twMerge("text-gray-500 transition-colors duration-200 group-hover:text-red-600", isActive && "text-red-600")

export const labelClassName = (isActive: boolean) =>
  twMerge(
    "text-gray-600 transition-colors duration-200 font-medium group-hover:text-red-600",
    isActive && "text-red-600",
  )

export const containerClassName = (isActive: boolean) =>
  twMerge(
    "flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group  hover:text-red-600  mb-1",
    isActive && "bg-red-50 text-red-600 shadow-sm",
  )
