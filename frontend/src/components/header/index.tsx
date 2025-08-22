"use client"
import { getUserData } from "@/services/auth"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { Menu } from "@/types"
import { Cookie } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import ButtonComponent from "../formFields/button"
import { ContainerStyles, WrapperStyles } from "./styles"
import MenuComponent from "./menu"

interface Props {
  menus: Menu[]
  setAuthModalState: (state: string | undefined) => void
}
export default function Header({ menus, setAuthModalState }: Props) {
  const access = Cookie.get("access")
  const update = useUserStore((state) => state.update)
  const user = useUserStore((state) => state.user)
  const { company } = useCompanyStore()
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`
  function handleGetUserData() {
    if (access) {
      getUserData()
        .then((res) => {
          update(res)
        })
        .catch(() => {
          Cookie.delete("access")
        })
    } else {
      update(null)
    }
  }
  useEffect(() => {
    handleGetUserData()
  }, [access])

  return (
    <div>
      <header>
        <div className={WrapperStyles}>
          <div className={ContainerStyles}>
            <div className="">
              <Link className="" href={"/"}>
                {company?.image_url && <Image src={imageSrc} width={50} height={50} alt={`${company.name} logo`} />}
              </Link>
            </div>
            <nav className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {user?.name ? (
                  <div className="flex items-center gap-6">
                    {menus.map((menu) => (
                      <MenuComponent key={menu.text} menu={menu} />
                    ))}
                  </div>
                ) : (
                  <ButtonComponent text="Entrar" onClickFn={() => setAuthModalState("login")} />
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}
