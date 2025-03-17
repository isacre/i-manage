"use client";
import { Category, CompanyType, ServiceLocation } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { useLocale } from "next-intl";

interface Props {
  company: CompanyType;
}

export default function CompanyComponent({ company }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const { category, id, name } = company;
  return (
    <Link href={`${locale}/companies/${id}`}>
      <div className=" gap-3 flex items-top text-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-lg">
        <Image
          className="rounded aspect-square object-cover mb-1"
          alt={name}
          src={"https://www.cliquemedicos.com.br/blog/wp-content/uploads/2020/01/Cl%C3%ADnico-M%C3%A9dico-scaled.jpg"}
          width={100}
          height={100}
        />
        <div className="align-text-top flex flex-col text-left gap-3">
          <b>{name}</b>
          <div className="flex align-middle gap-2 text-sm text-gray-400">
            <p className="text-sm text-yellow-600 flex items-center">
              <MdStarRate />
              {4.6}
            </p>
            <p>-</p>
            <p>{t("Categories." + category)}</p>
            <p>-</p>
            <p>{true ? t("Availability.available") : t("Availability.unavailable")}</p>
          </div>
          <div className="flex align-middle gap-2 text-sm text-gray-400">
            <p>{["local", "online"].map((item) => t(`Location.${item}`)).join("/")}</p>
            <p>-</p>
            <p>{"$".repeat(4)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
