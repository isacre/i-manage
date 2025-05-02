import React from "react"
import type { BorderRadius, TextColor, BackgroundColor, Padding, Cursor, FontWeight, Width } from "tailwindcss-types"

interface Props {
  onClickFn: Function
  text: string
  borderRadius?: BorderRadius
  color?: TextColor
  background?: BackgroundColor
  padding?: string | Padding
  cursor?: Cursor
  backgroundHover?: boolean
  weight?: FontWeight
  width?: Width
  disabled?: boolean
}
export default function ButtonComponent({
  onClickFn,
  text,
  color = "text-white",
  background = "bg-red-600",
  borderRadius = "rounded-lg",
  padding = "p-2 px-3",
  cursor = "cursor-pointer",
  weight = "font-normal",
  backgroundHover = true,
  width = "w-fit",
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClickFn()}
      className={`${weight} ${color} ${background} ${borderRadius} ${padding} ${cursor} ${backgroundHover ? "h-fit hover:bg-red-500" : ""} ${width} ${disabled ? "opacity-50" : ""}`}
    >
      {text}
    </button>
  )
}
