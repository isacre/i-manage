import { Button } from "@/components/ui/button"
import { UserType } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import {} from "@/components/ui/button"
import { useAuthModal } from "@/app/[locale]/(user)/AuthModalContext"

interface Props {
  user: UserType | null
}
export default function RightSide({ user }: Props) {
  const { setAuthModalState } = useAuthModal()
  const t = useTranslations("Header")
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setAuthModalState("login")} variant="ghost">
        {t("login")}
      </Button>
      <Button onClick={() => setAuthModalState("register")} variant="default">
        {t("register")}
      </Button>
    </div>
  )
}
