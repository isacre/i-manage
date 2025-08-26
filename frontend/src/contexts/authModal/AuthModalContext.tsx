import { createContext, useContext, useState } from "react"

export const AuthModalContext = createContext<{
  authModalState?: string
  setAuthModalState: React.Dispatch<React.SetStateAction<string | undefined>>
} | null>(null)

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider")
  return ctx
}

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [authModalState, setAuthModalState] = useState<string | undefined>(undefined)
  return <AuthModalContext.Provider value={{ authModalState, setAuthModalState }}>{children}</AuthModalContext.Provider>
}
