import { getUserData } from "@/services/auth"
import { useUserStore } from "@/stores/user-store"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import LoginModal from "./loginmodal"
import RegisterModal from "./siginmodal"
import RecoverAccountModal from "./recoverAccount"
import TermsModal from "./terms"

interface Props {
  state: string | undefined
  setState: (state: string | undefined) => void
}
export default function AuthModal({ state, setState }: Props) {
  const { update } = useUserStore()
  const router = useRouter()
  const locale = useLocale()

  function fetchAndStoreUserData() {
    getUserData().then((res) => {
      update(res)
      if (res.company !== null) {
        router.push(`/${locale}/admin/employees`)
      }
    })
  }

  return (
    <>
      <LoginModal
        isOpen={state === "login"}
        setOpen={(state) => setState(state)}
        fetchAndStoreUserData={fetchAndStoreUserData}
      />
      <RegisterModal
        isOpen={state === "register"}
        setOpen={(state) => setState(state)}
        fetchAndStoreUserData={fetchAndStoreUserData}
      />
      <RecoverAccountModal isOpen={state === "recoverAccount"} setOpen={(state) => setState(state)} />
      <TermsModal isOpen={state === "terms"} setOpen={(state) => setState(state)} />
    </>
  )
}
