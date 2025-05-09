"use client"
import React from "react"

export default function Details({ endereco, about, phone }: { endereco: string; about: string; phone: string }) {
  const url = `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed&disableDefaultUI=false`

  return (
    <div className="w-full rounded-lg bg-gray-100">
      <iframe
        src={url}
        height="250"
        width="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <b className="text-l font-bold">Sobre Nós</b>
          <p className="text-sm text-gray-500">{about}</p>
          <b className="text-l font-bold">Contato</b>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      </div>
    </div>
  )
}
