import { useId } from "react"

import DialogueComponent from "@/components/dialogue"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

interface Props {
  fetchAndStoreUserData: () => void
  isOpen: boolean
  setOpen: (state: string | undefined) => void
}
export default function LoginModal({ isOpen, setOpen, fetchAndStoreUserData }: Props) {
  const id = useId()
  const t = useTranslations("login")

  function handleOpenChange(open: boolean) {
    setOpen(open ? "login" : undefined)
  }

  return (
    <DialogueComponent open={isOpen} setOpen={handleOpenChange}>
      <div className="flex flex-col items-center gap-2">
        <DialogHeader>
          <DialogTitle className="sm:text-center">{t("login")}</DialogTitle>
          <DialogDescription className="sm:text-center">{t("loginDescription")}</DialogDescription>
        </DialogHeader>
      </div>

      <form className="space-y-5">
        <div className="space-y-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-email`}>{t("email")}</Label>
            <Input id={`${id}-email`} placeholder={t("emailPlaceholder")} type="email" required />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-password`}>{t("password")}</Label>
            <Input id={`${id}-password`} placeholder={t("passwordPlaceholder")} type="password" required />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2"></div>
          <a className="text-sm underline hover:no-underline" onClick={() => setOpen("recoverAccount")}>
            {t("forgotPassword")}
          </a>
        </div>
        <Button type="button" className="w-full" onClick={fetchAndStoreUserData}>
          {t("login")}
        </Button>
      </form>

      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
        <span className="text-muted-foreground text-xs">{t("or")}</span>
      </div>

      <Button onClick={() => setOpen("register")} variant="outline">
        {t("register")}
      </Button>
    </DialogueComponent>
  )
}
