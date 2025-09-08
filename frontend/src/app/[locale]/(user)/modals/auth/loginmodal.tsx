import { useId, useState } from "react"
import DialogueComponent from "@/components/dialogue"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { getTokens } from "@/services/auth"
import { Cookie } from "@/utils"
import { toast } from "react-toastify"
import LoadingSpinner from "@/components/loadingSpinner"

interface Props {
  fetchAndStoreUserData: () => void
  isOpen: boolean
  setOpen: (state: string | undefined) => void
}
export default function LoginModal({ isOpen, setOpen, fetchAndStoreUserData }: Props) {
  const id = useId()
  const t = useTranslations("Auth.login")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function handleOpenChange(open: boolean) {
    setOpen(open ? "login" : undefined)
  }

  function onSubmit(data: any) {
    setIsLoading(true)
    getTokens(data)
      .then((res) => {
        Cookie.set("access", res.access)
        Cookie.set("refresh", res.refresh)
        fetchAndStoreUserData()
        reset()
      })
      .catch((err) => {
        setErrors(Object.values(err.response.data))
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
              <DialogTitle className="sm:text-center">{t("title")}</DialogTitle>
              <DialogDescription className="sm:text-center">{t("description")}</DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                {errors && (
                  <div className="text-red-500">
                    {errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2"></div>
            </div>
            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </form>

          <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
            <span className="text-muted-foreground text-xs">{t("or")}</span>
          </div>

          <Button onClick={() => setOpen("register")} variant="outline">
            {t("register")}
          </Button>
        </>
      )}
    </DialogueComponent>
  )
}
