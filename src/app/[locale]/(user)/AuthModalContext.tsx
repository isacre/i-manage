import { createContext, useContext } from "react"

export const AuthModalContext = createContext<{
  authModalState: string | undefined
  setAuthModalState: React.Dispatch<React.SetStateAction<string | undefined>>
} | null>(null)

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider")
  return ctx
}
