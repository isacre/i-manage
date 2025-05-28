import Modal from "@/components/modal"
import { useForm } from "react-hook-form"
import Input from "@/components/formFields"
import ButtonComponent from "@/components/formFields/button"
import { useState } from "react"
import Register from "../register"
export default function LoginModal({
  isOpen,
  setOpen,
  initialOpen,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
  initialOpen: "login" | "register"
}) {
  const [creatingAccount, setCreatingAccount] = useState(initialOpen === "register")
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <>
      {creatingAccount ? (
        <Register isOpen={creatingAccount} setOpen={setCreatingAccount} />
      ) : (
        <Modal isOpen={isOpen} setOpen={setOpen} title="Login">
          <div className="flex flex-col gap-4">
            <h1 className="m-auto text-2xl">Acesse sua conta</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Input.TextField placeholder="Email" id="email" register={register} />
              <Input.TextField type="password" placeholder="Senha" id="password" register={register} />
              <ButtonComponent text="Entrar" onClickFn={() => {}} width="w-full" />
            </form>
            <ButtonComponent
              text="Esqueceu sua senha?"
              background="bg-transparent"
              onClickFn={() => {}}
              backgroundHover={false}
              color="text-black"
              width="w-full"
              padding="p-0"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-full bg-gray-300"></div>
                <span className="text-sm text-gray-500">ou</span>
                <div className="h-px w-full bg-gray-300"></div>
              </div>
              <ButtonComponent
                text="Criar conta"
                background="bg-transparent"
                onClickFn={() => setCreatingAccount(true)}
                backgroundHover={false}
                color="text-black"
                width="w-full"
                padding="p-0"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
