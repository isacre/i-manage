import { getUserData } from "@/services/auth"
import { useUserStore } from "@/stores/user-store"
import { Cookie } from "@/utils"
import { useEffect } from "react"

export default function useUserData() {
  const accessToken = Cookie.get("access")
  const setUser = useUserStore((state) => state.update)
  const user = useUserStore((state) => state.user)
  function getAndStoreUserData() {
    if (accessToken) {
      getUserData()
        .then((res) => {
          setUser(res)
        })
        .catch(() => {
          Cookie.delete("access")
        })
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    getAndStoreUserData()
  }, [])

  return { user }
}
