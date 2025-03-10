import { Service } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  service: Service;
  onClick: (productId: number) => void;
}

export default function ProductCard({ service, onClick }: Props) {
  const t = useTranslations("Currency");
  return (
    <div
      onClick={() => onClick(service.id)}
      key={service.name}
      className="p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        }
        alt={service.name}
        className="w-full h-48 object-cover rounded-lg mb-4 "
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.description}</h3>
      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-green-600">{t("symbol") + 60}</span>
        <span className="text-sm text-gray-500">{service.max_duration} min</span>
      </div>
    </div>
  );
}
