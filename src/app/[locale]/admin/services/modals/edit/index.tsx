"use client"
import Modal from "@/components/modal"
import { updateService } from "@/services/company/services"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { ServiceType } from "@/stores/service-store"
import React, { useState } from "react"

type TimeUnit = "minutes" | "hours" | "days"

interface EditServiceModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  service: ServiceType | null
}

export default function EditServiceModal({ isOpen, setOpen, service }: EditServiceModalProps) {
  const { register, handleSubmit, setValue } = useForm()
  const update = useServiceStore((state) => state.update)
  const user = useUserStore((state) => state.user)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minutes")

  // Set initial values when modal opens
  React.useEffect(() => {
    if (service) {
      setValue("name", service.name)
      setValue("price", service.price)
      // Convert minutes to the appropriate unit for display
      if (service.max_duration >= 1440) {
        setTimeUnit("days")
        setValue("max_duration", service.max_duration / 1440)
      } else if (service.max_duration >= 60) {
        setTimeUnit("hours")
        setValue("max_duration", service.max_duration / 60)
      } else {
        setTimeUnit("minutes")
        setValue("max_duration", service.max_duration)
      }
      setValue("required_employee_amount", service.required_employee_amount)
    }
  }, [service, setValue])

  function convertToMinutes(value: number, unit: TimeUnit): number {
    switch (unit) {
      case "minutes":
        return value
      case "hours":
        return value * 60
      case "days":
        return value * 1440
      default:
        return value
    }
  }

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
        toast.success("Serviço atualizado com sucesso")
        // Update the service in the store
        const services = useServiceStore.getState().services
        const updatedServices = services.map((srv) => (srv.id === updatedService.id ? updatedService : srv))
        update(updatedServices)
      })
      .catch(() => {
        toast.error("Erro ao atualizar serviço")
      })
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title="Editar Serviço">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Nome do Serviço
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite o nome do serviço"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("name")}
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                id="price"
                type="text"
                placeholder="R$ 0,00"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("price")}
              />
            </div>

            <div>
              <label htmlFor="max_duration" className="mb-1 block text-sm font-medium text-gray-700">
                Duração Máxima
              </label>
              <div className="flex gap-2">
                <input
                  id="max_duration"
                  type="number"
                  placeholder="Ex: 60"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                  {...register("max_duration")}
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                  className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="minutes">Minutos</option>
                  <option value="hours">Horas</option>
                  <option value="days">Dias</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="required_employee_amount" className="mb-1 block text-sm font-medium text-gray-700">
                Quantidade de Funcionários Necessários
              </label>
              <input
                id="required_employee_amount"
                type="number"
                placeholder="Ex: 2"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("required_employee_amount")}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-500"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
