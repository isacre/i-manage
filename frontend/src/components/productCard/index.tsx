import { ServiceType } from "../../stores/service-store"
import { Service } from "../../types"
import { useTranslations } from "next-intl"
import React from "react"

interface Props {
  service: ServiceType
  onClick: (productId: number) => void
}

export default function ProductCard({ service, onClick }: Props) {
  const t = useTranslations("Currency")

  function formatDuration(duration: number) {
    if (duration < 60) {
      return `${duration} min`
    }
    const durationInHours = Math.floor(duration / 60)
    if (durationInHours < 24) {
      return `${durationInHours} h`
    }
    const durationInDays = Math.floor(durationInHours / 24)
    return `${durationInDays} d`
  }
  return (
    <div
      onClick={() => onClick(service.id)}
      key={service.name}
      className="cursor-pointer rounded-lg p-3 shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        }
        alt={service.name}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.name}</h3>
      <p className="mb-4 text-sm text-gray-600">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-green-600">{t("symbol") + service.price}</span>
        <span className="text-sm text-gray-500">{formatDuration(service.max_duration)}</span>
      </div>
    </div>
  )
}
