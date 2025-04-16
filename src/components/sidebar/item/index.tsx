"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

function SidebarItem({ icon, label, link }: { icon: React.ReactNode; label: string; link: string }) {
  const pathname = usePathname();
  const isActive = pathname === link;
  const iconClassName = clsx("text-gray-500 transition-colors duration-200 group-hover:text-red-600", {
    "text-red-600": isActive,
  });
  const labelClassName = clsx("text-gray-600 transition-colors duration-200 font-medium group-hover:text-red-600", {
    "text-red-600": isActive,
  });
  const containerClassName = clsx(
    "flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-red-50 hover:text-red-600 hover:shadow-sm mb-1",
    {
      "bg-red-50 text-red-600 shadow-sm": isActive,
    }
  );

  return (
    <Link href={link}>
      <div className={containerClassName}>
        <div className={iconClassName}>{icon}</div>
        <span className={labelClassName}>{label}</span>
      </div>
    </Link>
  );
}

export default SidebarItem;
