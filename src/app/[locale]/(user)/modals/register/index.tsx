"use client"
import FormFields from "@/components/formFields"
import { registerUser } from "@/services/auth"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "@/components/modal"
import ButtonComponent from "@/components/formFields/button"
export default function RegisterUser({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) {
  const schema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const tUser = useTranslations("register_user")
  const {
    register: registerUserForm,
    handleSubmit: handleUserSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()
  const locale = useLocale()

  function onUserSubmit(data: any) {
    registerUser(data)
      .then(() => {
        toast.success(tUser("success"))
        router.push(`/${locale}/login`)
      })
      .catch(() => {
        toast.error(tUser("error"))
      })
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Cadastre-se">
      <form onSubmit={handleUserSubmit(onUserSubmit)} className="space-y-3">
        <FormFields.TextField
          type="text"
          label={tUser("name")}
          id="name"
          register={registerUserForm}
          placeholder={tUser("name")}
          error={errors.name?.message}
        />
        <FormFields.TextField
          type="tel"
          label={tUser("phone")}
          id="phone"
          register={registerUserForm}
          placeholder={tUser("phone")}
          error={errors.phone?.message}
        />
        <FormFields.TextField
          type="email"
          label={tUser("email")}
          id="email"
          register={registerUserForm}
          placeholder={tUser("email")}
          error={errors.email?.message}
        />
        <FormFields.TextField
          type="password"
          label={tUser("password")}
          id="password"
          register={registerUserForm}
          placeholder={tUser("password")}
          error={errors.password?.message}
        />
        <FormFields.Button width="w-full" text={tUser("register")} onClickFn={handleUserSubmit(onUserSubmit)} />
        <ButtonComponent
          text="Já tenho uma conta"
          background="bg-transparent"
          onClickFn={() => {
            setOpen(false)
          }}
          backgroundHover={false}
          color="text-black"
          width="w-full"
          padding="p-0"
        />
      </form>
    </Modal>
  )
}
