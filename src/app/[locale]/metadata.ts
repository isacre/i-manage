import { getCompanyByDomain } from "@/services/company"
import { headers } from "next/headers"
import React from "react"

export default async function getCompanyByDomainAndGenerateMetadata(locale: string) {
  const headersList = await headers()
  const domain = headersList.get("host")?.split(":")[0]
  const subdomain = domain?.split(".")[0]

  if (!subdomain) return { title: "iManage" }

  try {
    const company = await getCompanyByDomain(subdomain)
    return {
      description: company.description || "Sistema de agendamento inteligente.",
      icons: {
        title: `${company.name}`,
        icon: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
        shortcut: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
      },
      robots: "index, follow",
      locale: locale,
      type: "website",
      openGraph: {
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
          },
        ],
      },
    }
  } catch (err) {}
}
