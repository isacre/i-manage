"use client"
import Modal from "@/components/modal"
import { registerService } from "@/services/company/services"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"

type TimeUnit = "minutes" | "hours" | "days"

export default function RegisterServiceModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const { register, handleSubmit } = useForm()
  const add = useServiceStore((state) => state.add)
  const user = useUserStore((state) => state.user)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minutes")

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
    const durationInMinutes = convertToMinutes(Number(data.max_duration), timeUnit)

    registerService({
      ...data,
      max_duration: durationInMinutes,
      company: user?.company?.id,
    }).then((service) => {
      setOpen(false)
      toast.success("Serviço adicionado com sucesso")
      add(service)
    })
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title="Adicionar Serviço">
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
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                placeholder="Descreva o serviço"
                className="h-24 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                {...register("description")}
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
              Adicionar Serviço
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
