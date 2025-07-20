import { useId } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import DialogueComponent from "@/components/dialogue"

interface Props {
  isOpen: boolean
  setOpen: (state: string | undefined) => void
  fetchAndStoreUserData: () => void
}
export default function SignupModal({ isOpen, setOpen, fetchAndStoreUserData }: Props) {
  const t = useTranslations("register")
  const id = useId()

  function handleOpenChange(open: boolean) {
    setOpen(open ? "register" : undefined)
  }

  return (
    <DialogueComponent open={isOpen} setOpen={handleOpenChange}>
      <div className="flex flex-col items-center gap-2">
        <DialogHeader>
          <DialogTitle className="sm:text-center">{t("register")}</DialogTitle>
          <DialogDescription className="sm:text-center">{t("registerDescription")}</DialogDescription>
        </DialogHeader>
      </div>
      <form className="space-y-5">
        <div className="space-y-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-name`}>{t("fullName")}</Label>
            <Input id={`${id}-name`} placeholder={t("fullNamePlaceholder")} type="text" required />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-email`}>{t("email")}</Label>
            <Input id={`${id}-email`} placeholder={t("emailPlaceholder")} type="email" required />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-password`}>{t("password")}</Label>
            <Input id={`${id}-password`} placeholder={t("passwordPlaceholder")} type="password" required />
          </div>
        </div>
        <Button type="button" className="w-full" onClick={fetchAndStoreUserData}>
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
    </DialogueComponent>
  )
}
