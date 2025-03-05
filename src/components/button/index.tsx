import React from "react";
import type { BorderRadius, TextColor, BackgroundColor, Padding, Cursor } from "tailwindcss-types";

interface Props {
  onClickFn: Function;
  text: string;
  borderRadius?: BorderRadius;
  color?: TextColor;
  background?: BackgroundColor;
  padding?: Padding;
  cursor?: Cursor;
  hoverColor?: TextColor;
  hoverBackground?: BackgroundColor;
}
export default function ButtonComponent({
  onClickFn,
  text,
  color = "text-white",
  background = "bg-red-600",
  borderRadius = "rounded",
  padding = "p-3",
  cursor = "cursor-pointer",
  hoverBackground,
  hoverColor,
}: Props) {
  return (
    <div
      onClick={() => onClickFn()}
      className={`${color} ${background} ${borderRadius} ${padding} ${cursor} ${`:hover${hoverBackground} ${`:hover${hoverColor}`}`} h-fit`}
    >
      {text}
    </div>
  );
}
