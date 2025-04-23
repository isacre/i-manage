import React from "react"
import type { BorderRadius, TextColor, BackgroundColor, Padding, Cursor, FontWeight } from "tailwindcss-types"

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
}: Props) {
  return (
    <button
      onClick={() => onClickFn()}
      className={`${weight} ${color} ${background} ${borderRadius} ${padding} ${cursor} ${backgroundHover ? "h-fit hover:bg-red-500" : ""}`}
    >
      {text}
    </button>
  )
}
