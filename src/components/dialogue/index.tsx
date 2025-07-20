import { Dialog, DialogContent } from "@/components/ui/dialog"
import { twMerge } from "tailwind-merge"
import React from "react"

interface Props {
  open: boolean
  children: React.ReactNode
  setOpen: (open: boolean) => void
  Width?: string
}
export default function DialogueComponent({ children, open, setOpen, Width = "" }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={twMerge(Width)}>{children}</DialogContent>
    </Dialog>
  )
}
