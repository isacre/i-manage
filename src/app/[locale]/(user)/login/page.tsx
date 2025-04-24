"use client"
import FormFields from "@/components/formFields"
import TabsComponent from "@/components/tabs"
import { getTokens, getUserData } from "@/services/auth"
import { useUserStore } from "@/stores/user-store"
import { setCookie } from "@/utils"
import { serialize } from "cookie"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function Login() {
  const t = useTranslations("login")
  const [activeTab, setActiveTab] = useState("Login")
  const locale = useLocale()
  const router = useRouter()
  const { update } = useUserStore()
  const { register, handleSubmit } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function fetchAndStoreUserData() {
    getUserData().then((res) => {
      update(res)
      if (res.company !== null) {
        router.push(`/${locale}/admin/employees`)
      } else {
        router.push(`/${locale}/`)
      }
    })
  }
  function login(data: { email: string; password: string }) {
    getTokens(data)
      .then((res) => {
        setCookie("access", res.access)
        setCookie("refresh", res.refresh)
        fetchAndStoreUserData()
      })
      .catch((err) => {
        toast.error(t("error"))
      })
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <TabsComponent
            tabs={[{ text: "Login", value: "Login", onClick: () => setActiveTab("Login") }]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="mb-4"
          />
          <form className="space-y-6" onSubmit={handleSubmit(login)}>
            <FormFields.TextField
              type="email"
              label={t("email")}
              id="email"
              register={register}
              placeholder={t("email")}
            />
            <FormFields.TextField
              type="password"
              label={t("password")}
              id="password"
              register={register}
              placeholder={t("password")}
            />
            <FormFields.Button width="w-full" text={t("submit")} onClickFn={handleSubmit(login)} />
          </form>
        </div>
      </div>
    </div>
  )
}
