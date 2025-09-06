"use client"
import { getCompanyByDomain } from "@/services/company"
import { useCompanyStore } from "@/stores/company-store"
import "@radix-ui/themes/styles.css"
import { notFound, redirect } from "next/navigation"
import { useEffect } from "react"

export default function useUpdateCompanyByDomain() {
  const { update, company } = useCompanyStore()
  useEffect(() => {
    const companyIdentifier = window?.location?.hostname?.split(".")[0]
    if (["imanage", "imanage.com", "localhost", "i-manage-frontend"].includes(companyIdentifier)) {
      return redirect("/about")
    }
    getCompanyByDomain(companyIdentifier)
      .then((res) => {
        update(res)
      })
      .catch(() => {
        return notFound()
      })
  }, [])

  return { company }
}
