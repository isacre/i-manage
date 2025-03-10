import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  text: string;
  image: string;
  size?: number;
}

export default function CategoryComponent({ image, text, size = 100 }: Props) {
  const t = useTranslations("Categories");
  return (
    <div className="flex flex-col items-center text-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-lg">
      <Image className="rounded aspect-square object-cover mb-1" alt={text} src={image} width={size} height={size} />
      <p>{t(text)}</p>
    </div>
  );
}
