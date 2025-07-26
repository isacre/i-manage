"use client"
import FormFields from "@/components/formFields"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Preview from "./Preview"

export default function CustomizeCompany() {
  const t = useTranslations("Admin.Customize")
  const tCommon = useTranslations("Common")
  const company = useUserStore((state) => state.user?.company)
  const [isLoading, setIsLoading] = useState(false)

  const {
    formState: { errors },
    setValue,
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
    },
  })

  // Set form values when company data loads
  useEffect(() => {
    if (company) {
      setValue("name", company.name)
      setValue("description", company.description)
      setValue("identifier", company.identifier)
      setValue("phone", company.phone)
      setValue("address", company.address)
      setValue("primary_color", company.primary_color)
      setValue("opens_at", company.opens_at)
      setValue("closes_at", company.closes_at)
      setValue("timezone", company.timezone)
    }
  }, [company, setValue])

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
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <Preview company={company} />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-blue-600 px-8 py-3 text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? tCommon("Loading") : t("button")}
          </button>
        </div>
      </div>
    </div>
  )
}
