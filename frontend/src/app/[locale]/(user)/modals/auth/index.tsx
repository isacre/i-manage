import { useAuthModal } from "@/contexts/authModal/AuthModalContext"
import { getUserData } from "@/services/auth"
import { useUserStore } from "@/stores/user-store"
import { useLocale } from "next-intl"
import LoginModal from "./loginmodal"
import RegisterModal from "./siginmodal"
import TermsModal from "./terms"

export default function AuthModal() {
  const { update } = useUserStore()
  const locale = useLocale()
  const { setAuthModalState, authModalState } = useAuthModal()

  function fetchAndStoreUserData() {
    getUserData().then((res) => {
      update(res)
      if (res.company !== null) {
        const newSubdomain = res.company.identifier
        const newUrl = `http://${newSubdomain}.localhost:3000/${locale}/admin/employees`
        window.location.href = newUrl
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
