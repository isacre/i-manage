import { useAuthModal } from "@/contexts/authModal/AuthModalContext"
import { getUserData } from "@/services/auth"
import { useUserStore } from "@/stores/user-store"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import LoginModal from "./loginmodal"
import RegisterModal from "./siginmodal"
import TermsModal from "./terms"

export default function AuthModal() {
  const { update } = useUserStore()
  const router = useRouter()
  const locale = useLocale()
  const { setAuthModalState, authModalState } = useAuthModal()

  function fetchAndStoreUserData() {
    getUserData().then((res) => {
      update(res)
      if (res.company !== null) {
        router.push(`/${locale}/admin/employees`)
      }
      setAuthModalState(undefined)
    })
  }

  return (
    <>
      <LoginModal
        isOpen={authModalState === "login"}
        setOpen={(state) => setAuthModalState(state)}
        fetchAndStoreUserData={fetchAndStoreUserData}
      />
      <RegisterModal
        isOpen={authModalState === "register"}
        setOpen={(state) => setAuthModalState(state)}
        fetchAndStoreUserData={fetchAndStoreUserData}
      />
      <TermsModal isOpen={authModalState === "terms"} setOpen={(state) => setAuthModalState(state)} />
    </>
  )
}
