"use client";
import logo from "@/assets/logo/imanagelogo.png";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "../button";
export default function UnauthenticatedHeader() {
  const locale = useLocale();
  const t = useTranslations("Header");
  return (
    <div className="h-[80px] bg-[#fbfbfb] fixed z-1 flex w-full  border border-b-[#dcdcdc] align-center px-50 place-content-center justify-between">
      <div className="flex items-center gap-1">
        <Link className="flex items-center gap-1" href={"/"}>
          <Image src={logo} alt="iManage logo" className="w-[150px] h-[78px] object-contain" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/${locale}/register_company`}>
          <ButtonComponent
            onClickFn={() => console.log("")}
            text={t("companyText")}
            backgroundHover={false}
            background="bg-transparent"
            color="text-red-600"
            weight="font-thin"
          />
        </Link>
        <ButtonComponent onClickFn={() => console.log("")} text={t("userText")} />
      </div>
    </div>
  );
}
