"use client";
import logo from "@/assets/logo/imanagelogo.png";
import { useUserStore } from "@/stores/user-store";
import { Menu } from "@/types";
import { deleteCookie } from "@/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
interface Props {
  menus: Menu[];
}
export default function AuthenticatedHeader({ menus }: Props) {
  const t = useTranslations("Header");
  const update = useUserStore((state) => state.update);
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="fixed z-1 flex w-full h-20 border border-b-[#dcdcdc] align-center px-50 place-content-center justify-between">
      <div className="flex items-center gap-1">
        <Link href={"/"}>
          <Image src={logo} alt="iManage logo" className="w-[100px] h-[50px] object-contain" />
        </Link>
      </div>
      <button
        className="flex items-center p-4 gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
        onClick={() => {
          deleteCookie("access");
          router.push(`/${locale}/`);
          update(null);
        }}
      >
        <CiLogout className="w-6 h-6" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}
