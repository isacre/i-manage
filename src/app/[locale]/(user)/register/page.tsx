"use client"
import TabsComponent from "@/components/tabs"
import { useTranslations } from "next-intl"
import { useState } from "react"
import RegisterCompany from "./company"
import RegisterUser from "./user"

export default function Register() {
  const tLogin = useTranslations("login")
  const [activeTab, setActiveTab] = useState(tLogin("company"))

  const tabs = [
    { text: tLogin("company"), onClick: () => setActiveTab(tLogin("company")), value: tLogin("company") },
    { text: tLogin("user"), onClick: () => setActiveTab(tLogin("user")), value: tLogin("user") },
  ]

  return (
    <div className="min-h-screen py-2">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <TabsComponent className="mb-4" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === tLogin("company") ? <RegisterCompany /> : <RegisterUser />}
      </div>
    </div>
  )
}
