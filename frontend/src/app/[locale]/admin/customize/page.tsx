"use client"

import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import Preview from "./preview"
import { updateCompany } from "@/services/company"
import { ArrowRightIcon } from "lucide-react"
import CompanyFormFields from "./companyFormFields"
import { useCompanyStore } from "@/stores/company-store"
import { toast } from "react-toastify"

export default function CustomizeCompany() {
  const t = useTranslations("Admin.Customize")
  const company = useCompanyStore((state) => state.company)

  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: company?.name || "",
      description: company?.description || "",
      identifier: company?.identifier || "",
      phone: company?.phone || "",
      address: company?.address || "",
      primary_color: company?.primary_color || "#000000",
      opens_at: company?.opens_at || "09:00",
      closes_at: company?.closes_at || "18:00",
      timezone: company?.timezone || "America/Sao_Paulo",
      banner: company?.banner || "",
      image: company?.image || "",
    },
  })

  function handleUpdatingCompany() {
    updateCompany(company?.id as number, {
      name: company?.name,
      description: company?.description,
      phone: company?.phone,
      address: company?.address,
      primary_color: company?.primary_color,
      banner: company?.banner,
      image: company?.image,
      work_days: company?.work_days,
    })
      .then(() => {
        toast.success(t("success"))
      })
      .catch(() => {
        toast.error(t("error"))
      })
  }

  if (!company) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading company information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-[60px] items-center justify-between border-b border-gray-200 px-4">
        <p className="text-md font-medium text-gray-700">Edit company</p>
        <button
          type="button"
          onClick={handleUpdatingCompany}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("button")}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-4 p-2">
        <CompanyFormFields />
        <Preview />
      </div>
    </div>
  )
}
