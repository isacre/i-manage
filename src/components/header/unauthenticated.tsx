"use client";
import logo from "@/assets/logo/imanagelogo.png";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "../button";
import { useRouter } from "next/navigation";
export default function UnauthenticatedHeader() {
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();

  return (
    <header>
      <div className="bg-red600 h-[80px] bg-[#fbfbfb] fixed z-1 flex w-full  border border-b-[#dcdcdc] align-center px-50 place-content-center justify-between">
        <div className="flex items-center gap-1">
          <Link className="flex items-center gap-1" href={"/"}>
            <Image src={logo} alt="iManage logo" className="w-[100px] h-[50px] object-contain" />
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ButtonComponent
              onClickFn={() => router.push(`/${locale}/register`)}
              text={t("register")}
              backgroundHover={false}
              background="bg-transparent"
              color="text-red-600"
              weight="font-thin"
            />
            <ButtonComponent onClickFn={() => router.push(`/${locale}/login`)} text={t("login")} />
          </div>
        </nav>
      </div>
    </header>
  );
}
