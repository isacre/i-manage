"use client"
import { registerCompany } from "@/services/auth"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import FormFields from "@/components/formFields"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
export default function RegisterCompany() {
  const tCompany = useTranslations("register_company")
  const tCategories = useTranslations("Categories")
  const {
    register: registerCompanyForm,
    handleSubmit: handleCompanySubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        phone: z.string().min(1),
        category: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    ),
  })
  const router = useRouter()
  const categories = ["electric", "mechanic", "health", "home", "services"]

  function onCompanySubmit(data: any) {
    registerCompany(data)
      .then((res) => {
        console.log(res)
        toast.success(tCompany("success"))
        router.push("/login")
      })
      .catch((err) => {
        toast.error(tCompany("error"))
      })
  }

  return (
    <form onSubmit={handleCompanySubmit(onCompanySubmit)} className="space-y-8">
      <FormFields.TextField
        label={tCompany("name")}
        id="name"
        register={registerCompanyForm}
        placeholder={tCompany("name")}
        error={errors.name?.message}
      />
      <FormFields.TextField
        label={tCompany("description")}
        id="description"
        register={registerCompanyForm}
        placeholder={tCompany("description")}
        error={errors.description?.message}
      />
      <FormFields.TextField
        label={tCompany("phone")}
        id="phone"
        register={registerCompanyForm}
        placeholder={tCompany("phone")}
        error={errors.phone?.message}
        type="tel"
      />
      <FormFields.SelectField
        label={tCompany("category")}
        id="category"
        register={registerCompanyForm}
        options={categories.map((category) => ({ label: tCategories(category), value: category }))}
        error={errors.category?.message}
      />
      <FormFields.TextField
        label={tCompany("email")}
        id="email"
        register={registerCompanyForm}
        placeholder={tCompany("email")}
        error={errors.email?.message}
        type="email"
      />
      <FormFields.TextField
        label={tCompany("password")}
        id="password"
        register={registerCompanyForm}
        placeholder={tCompany("password")}
        error={errors.password?.message}
        type="password"
      />
      <FormFields.Button width="w-full" text={tCompany("register")} onClickFn={handleCompanySubmit(onCompanySubmit)} />
    </form>
  )
}
