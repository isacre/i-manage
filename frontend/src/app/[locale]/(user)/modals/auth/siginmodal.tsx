import DialogueComponent from "@/components/dialogue"
import LoadingSpinner from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/services/auth"
import { useTranslations } from "next-intl"
import { useId, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface Props {
  isOpen: boolean
  setOpen: (state: string | undefined) => void
  fetchAndStoreUserData: () => void
}
export default function SignupModal({ isOpen, setOpen, fetchAndStoreUserData }: Props) {
  const t = useTranslations("Register")
  const id = useId()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  function handleOpenChange(open: boolean) {
    setOpen(open ? "register" : undefined)
  }

  function onSubmit(data: any) {
    setIsLoading(true)
    registerUser(data)
      .then((res) => {
        toast.success("Cadastro realizado com sucesso")
        setOpen("login")
        reset()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <DialogueComponent open={isOpen} setOpen={handleOpenChange}>
      {isLoading ? (
        <div className="flex h-[200px] w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <DialogHeader>
              <DialogTitle className="sm:text-center">{t("register")}</DialogTitle>
              <DialogDescription className="sm:text-center">{t("registerDescription")}</DialogDescription>
            </DialogHeader>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>{t("fullName")}</Label>
                <Input
                  id={`${id}-name`}
                  placeholder={t("fullNamePlaceholder")}
                  type="text"
                  required
                  {...register("name")}
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-email`}>{t("email")}</Label>
                <Input
                  id={`${id}-email`}
                  placeholder={t("emailPlaceholder")}
                  type="email"
                  required
                  {...register("email")}
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-password`}>{t("password")}</Label>
                <Input
                  id={`${id}-password`}
                  placeholder={t("passwordPlaceholder")}
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-phone`}>{t("phone")}</Label>
                <Input
                  id={`${id}-phone`}
                  placeholder={t("phonePlaceholder")}
                  type="tel"
                  required
                  {...register("phone")}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t("register")}
            </Button>
          </form>

          <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
            <span className="text-muted-foreground text-xs">{t("or")}</span>
          </div>
          <Button onClick={() => setOpen("login")} variant="outline">
            {t("login")}
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            {t("bySigningUpYouAgreeToOur")}{" "}
            <a className="cursor-pointer underline hover:no-underline" onClick={() => setOpen("terms")}>
              {t("terms")}
            </a>
            .
          </p>
        </>
      )}
    </DialogueComponent>
  )
}
