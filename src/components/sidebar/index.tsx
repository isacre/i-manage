"use client";
import logo from "@/assets/logo/imanagelogo.png";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import SidebarItem from "./item";
import { deleteCookie } from "@/utils";

export default function Sidebar({ menus }: { menus: { icon: React.ReactNode; label: string; link: string }[] }) {
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="w-65 h-screen bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border-r border-gray-100 flex flex-col">
      <div className="border-b border-gray-100 p-4">
        <Image src={logo} alt="logo" width={120} className="m-auto h-20 object-contain" />
      </div>
      <nav className="flex-1 p-4 gap-2 overflow-y-auto">
        {menus.map((menu) => (
          <SidebarItem key={menu.label} icon={menu.icon} label={menu.label} link={`/${locale}${menu.link}`} />
        ))}
      </nav>
      <button
        className="flex items-center p-4 gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
        onClick={() => {
          deleteCookie("access");
          deleteCookie("refresh");
          router.push(`/${locale}/login`);
        }}
      >
        <CiLogout className="w-6 h-6" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}
