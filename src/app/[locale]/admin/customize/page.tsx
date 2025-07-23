"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { updateCompany } from "@/services/company"
import FormFields from "@/components/formFields"

const customizeSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  identifier: z.string().min(1, "URL identifier is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  primary_color: z.string().min(1, "Primary color is required"),
  logo: z.any().optional(),
  banner: z.any().optional(),
  opens_at: z.string().min(1, "Opening time is required"),
  closes_at: z.string().min(1, "Closing time is required"),
  timezone: z.string().min(1, "Timezone is required"),
})

type CustomizeFormData = z.infer<typeof customizeSchema>

export default function CustomizeCompany() {
  const t = useTranslations("Admin.Customize")
  const tCommon = useTranslations("Common")
  const { company, update: updateCompanyStore } = useCompanyStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomizeFormData>({
    resolver: zodResolver(customizeSchema),
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
  React.useEffect(() => {
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

  const onSubmit = async (data: CustomizeFormData) => {
    if (!user?.company?.id) {
      toast.error(t("error"))
      return
    }

    setIsLoading(true)
    try {
      // Create FormData for file uploads
      const formData = new FormData()

      // Add text fields
      Object.keys(data).forEach((key) => {
        if (key !== "logo" && key !== "banner" && data[key as keyof CustomizeFormData]) {
          formData.append(key, data[key as keyof CustomizeFormData] as string)
        }
      })

      // Add files if they exist
      const logoFile = (data.logo as FileList)?.[0]
      const bannerFile = (data.banner as FileList)?.[0]

      if (logoFile) {
        formData.append("image", logoFile)
      }
      if (bannerFile) {
        formData.append("banner", bannerFile)
      }

      const updatedCompany = await updateCompany(user.company.id, formData)
      updateCompanyStore(updatedCompany)
      toast.success(t("success"))
    } catch (error) {
      console.error("Error updating company:", error)
      toast.error(t("error"))
    } finally {
      setIsLoading(false)
    }
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
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-gray-600">Customize your company's appearance and information to match your brand.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">{t("sections.basic")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormFields.TextField
                id="name"
                label={t("fields.name")}
                placeholder={t("fields.namePlaceholder")}
                register={register}
                error={errors.name?.message}
              />
              <FormFields.TextField
                id="identifier"
                label={t("fields.identifier")}
                placeholder={t("fields.identifierPlaceholder")}
                register={register}
                error={errors.identifier?.message}
              />
              <div className="md:col-span-2">
                <label htmlFor="description" className="mb-2 block pl-1 text-sm font-medium text-gray-700">
                  {t("fields.description")}
                </label>
                <textarea
                  id="description"
                  placeholder={t("fields.descriptionPlaceholder")}
                  className="h-24 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("description")}
                />
                {errors.description?.message && (
                  <small className="mt-1 text-red-500">{errors.description.message}</small>
                )}
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">{t("sections.appearance")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormFields.ColorField
                id="primary_color"
                label={t("fields.primaryColor")}
                register={register}
                error={errors.primary_color?.message}
                defaultValue={company.primary_color}
              />
              <FormFields.FileField
                id="logo"
                label={t("fields.logo")}
                register={register}
                error={errors.logo?.message?.toString()}
                currentImageUrl={company.image_url}
              />
              <div className="md:col-span-2">
                <FormFields.FileField
                  id="banner"
                  label={t("fields.banner")}
                  register={register}
                  error={errors.banner?.message?.toString()}
                  currentImageUrl={company.banner_url}
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">{t("sections.contact")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormFields.TextField
                id="phone"
                label={t("fields.phone")}
                placeholder={t("fields.phonePlaceholder")}
                register={register}
                error={errors.phone?.message}
              />
              <div className="md:col-span-2">
                <FormFields.TextField
                  id="address"
                  label={t("fields.address")}
                  placeholder={t("fields.addressPlaceholder")}
                  register={register}
                  error={errors.address?.message}
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">{t("sections.schedule")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="opens_at" className="mb-2 block pl-1 text-sm font-medium text-gray-700">
                  {t("fields.opensAt")}
                </label>
                <input
                  id="opens_at"
                  type="time"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("opens_at")}
                />
                {errors.opens_at?.message && <small className="mt-1 text-red-500">{errors.opens_at.message}</small>}
              </div>
              <div>
                <label htmlFor="closes_at" className="mb-2 block pl-1 text-sm font-medium text-gray-700">
                  {t("fields.closesAt")}
                </label>
                <input
                  id="closes_at"
                  type="time"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("closes_at")}
                />
                {errors.closes_at?.message && <small className="mt-1 text-red-500">{errors.closes_at.message}</small>}
              </div>
              <div>
                <label htmlFor="timezone" className="mb-2 block pl-1 text-sm font-medium text-gray-700">
                  {t("fields.timezone")}
                </label>
                <select
                  id="timezone"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("timezone")}
                >
                  <option value="">{t("fields.timezonePlaceholder")}</option>
                  <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
                {errors.timezone?.message && <small className="mt-1 text-red-500">{errors.timezone.message}</small>}
              </div>
            </div>
          </div>
          {/* Preview Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Preview</h2>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-4 flex items-center gap-4">
                {company.image_url && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`}
                    alt="Company Logo"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: company.primary_color }}>
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.description}</p>
                </div>
              </div>
              {company.banner_url && (
                <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.banner_url}`}
                    alt="Company Banner"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Phone:</strong> {company.phone}
                </p>
                <p>
                  <strong>Address:</strong> {company.address}
                </p>
                <p>
                  <strong>Hours:</strong> {company.opens_at} - {company.closes_at}
                </p>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-8 py-3 text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? tCommon("Loading") : t("button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
