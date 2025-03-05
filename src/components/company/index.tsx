"use client";
import { Category, ServiceLocation } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdStarRate } from "react-icons/md";

export declare interface CompanyMiniatureProps {
  id: number;
  text: string;
  image: string;
  rating: number;
  category: Category;
  price_category: number;
  available?: boolean;
  location?: ServiceLocation[];
  image_size?: number;
}
interface Props {
  company: CompanyMiniatureProps;
}

export default function CompanyComponent({ company }: Props) {
  const t = useTranslations();
  const { id, category, image, rating, text, image_size = 100, location = ["online", "local"], price_category, available = true } = company;
  return (
    <Link href={`/companyes/${id}`}>
      <div className=" gap-3 flex items-top text-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-lg">
        <Image className="rounded aspect-square object-cover mb-1" alt={text} src={image} width={image_size} height={image_size} />
        <div className="align-text-top flex flex-col text-left gap-3">
          <b>{text}</b>
          <div className="flex align-middle gap-2 text-sm text-gray-400">
            <p className="text-sm text-yellow-600 flex items-center">
              <MdStarRate />
              {rating}
            </p>
            <p>-</p>
            <p>{category}</p>
            <p>-</p>
            <p>{available ? t("Availability.available") : t("Availability.unavailable")}</p>
          </div>
          <div className="flex align-middle gap-2 text-sm text-gray-400">
            <p>{location.map((item) => t(`Location.${item}`)).join("/")}</p>
            <p>-</p>
            <p>{"$".repeat(price_category)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
