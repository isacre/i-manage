import { getCompanyByDomain } from "@/services/company"
import { cache } from "react"

type MetadataProps = {
  locale: string
  host: string
  title?: string
}

export default cache(async function getCompanyByDomainAndGenerateMetadata({ locale, host, title }: MetadataProps) {
  const domain = host?.split(":")[0]
  const subdomain = domain?.split(".")[0]

  if (!subdomain) return { title: "iManage", locale: "pt-BR" }

  try {
    const company = await getCompanyByDomain(subdomain)
    return {
      title: title || company.name,
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
  } catch (err) {
    return { title: "iManage" }
  }
})
