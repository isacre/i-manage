"use client"
import Modal from "../../../../../../components/modal"
import { updateService } from "../../../../../../services/company/services"
import { useServiceStore } from "../../../../../../stores/service-store"
import { useUserStore } from "../../../../../../stores/user-store"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { ServiceType } from "../../../../../../stores/service-store"
import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { TimeUnit } from "@/types"

interface EditServiceModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  service: ServiceType | null
}

export default function EditServiceModal({ isOpen, setOpen, service }: EditServiceModalProps) {
  const t = useTranslations("Admin.Services")
  const tCommon = useTranslations("Common")
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minutes")
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      max_duration: "",
      required_employee_amount: "",
    },
  })
  const update = useServiceStore((state) => state.update)
  const user = useUserStore((state) => state.user)
  const minutesInHour = 60
  const minutesInDay = 1440

  function setInitialValues() {
    if (!service) return
    setValue("name", service.name)
    setValue("price", String(service.price))
    setValue("description", service.description)
    if (service.max_duration >= minutesInDay) {
      setTimeUnit("days")
      setValue("max_duration", String(service.max_duration / minutesInDay))
    } else if (service.max_duration >= minutesInHour) {
      setTimeUnit("hours")
      setValue("max_duration", String(service.max_duration / minutesInHour))
    } else {
      setTimeUnit("minutes")
      setValue("max_duration", String(service.max_duration))
    }
    setValue("required_employee_amount", String(service.required_employee_amount))
  }

  function convertToMinutes(value: number, unit: TimeUnit): number {
    switch (unit) {
      case "minutes":
        return value
      case "hours":
        return value * minutesInHour
      case "days":
        return value * minutesInDay
      default:
        return value
    }
  }

  useEffect(() => {
    setInitialValues()
  }, [service, setValue, setInitialValues])

  function onSubmit(data: any) {
    if (!user?.company?.id || !service?.id) return

    const durationInMinutes = convertToMinutes(Number(data.max_duration), timeUnit)

    updateService(service.id.toString(), {
      ...data,
      max_duration: durationInMinutes,
      company: user.company.id,
    })
      .then((updatedService) => {
        setOpen(false)
        toast.success(t("editSuccess"))
        // Update the service in the store
        const services = useServiceStore.getState().services
        const updatedServices = services.map((srv) => (srv.id === updatedService.id ? updatedService : srv))
        update(updatedServices)
      })
      .catch(() => {
        toast.error(t("editError"))
      })
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title={t("editTitle")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                {t("register.name")}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t("register.namePlaceholder")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("name")}
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                {t("register.description")}
              </label>
              <textarea
                id="description"
                placeholder={t("register.descriptionPlaceholder")}
                className="h-24 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("description")}
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                {t("register.price")}
              </label>
              <input
                id="price"
                type="text"
                placeholder={t("register.pricePlaceholder")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("price")}
              />
            </div>

            <div>
              <label htmlFor="max_duration" className="mb-1 block text-sm font-medium text-gray-700">
                {t("register.maxDuration")}
              </label>
              <div className="flex gap-2">
                <input
                  id="max_duration"
                  type="number"
                  placeholder={t("register.maxDurationPlaceholder")}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("max_duration")}
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="minutes">{t("register.minutes")}</option>
                  <option value="hours">{t("register.hours")}</option>
                  <option value="days">{t("register.days")}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="required_employee_amount" className="mb-1 block text-sm font-medium text-gray-700">
                {t("register.requiredEmployeeAmount")}
              </label>
              <input
                id="required_employee_amount"
                type="number"
                placeholder={t("register.requiredEmployeeAmountPlaceholder")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("required_employee_amount")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              {tCommon("Cancel")}
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-500"
            >
              {t("edit.submit")}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
