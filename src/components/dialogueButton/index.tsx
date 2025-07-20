import React, { useEffect, useId } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Props {
  buttonText: string
  children: React.ReactNode
  variant?: "ghost" | "default" | "outline" | "secondary" | "destructive" | "link"
  open?: boolean
  onClick?: () => void
  setOpen?: (open: boolean) => void
}
export default function DialogueButtonComponent({
  children,
  buttonText,
  variant = "ghost",
  open,
  onClick,
  setOpen,
}: Props) {
  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm" className="text-sm" onClick={onClick}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
