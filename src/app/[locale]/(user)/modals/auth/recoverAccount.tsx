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
}
export default function RecoverAccountModal({ isOpen, setOpen }: Props) {
  const t = useTranslations("recoverAccount")
  const id = useId()

  function handleOpenChange(open: boolean) {
    setOpen(open ? "recoverAccount" : undefined)
  }

  function recoverAccount() {
    console.log("recoverAccount")
  }

  return (
    <DialogueComponent open={isOpen} setOpen={handleOpenChange}>
      <div className="flex flex-col items-center gap-2">
        <DialogHeader>
          <DialogTitle className="sm:text-center">{t("recoverAccount")}</DialogTitle>
          <DialogDescription className="sm:text-center">{t("recoverAccountDescription")}</DialogDescription>
        </DialogHeader>
      </div>
      <form className="space-y-5">
        <div className="space-y-4">
          <Label htmlFor={`${id}-email`}>{t("email")}</Label>
          <Input id={`${id}-email`} placeholder={t("emailPlaceholder")} type="email" required />
        </div>
        <Button type="button" className="w-full" onClick={recoverAccount}>
          {t("submit")}
        </Button>
      </form>
    </DialogueComponent>
  )
}
