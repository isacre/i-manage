"use client"
import { IoClose } from "react-icons/io5"
import * as s from "./styles"

interface ModalProps {
  isOpen: boolean
  setOpen: Function
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, setOpen, title, children }: ModalProps) {
  if (!isOpen) return null
  return (
    <div className={s.wrapperStyle} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={s.backgroundStyle} onClick={() => setOpen(false)} />
      <div className={s.modalContentStyle}>
        <div className={s.modalHeaderStyle}>
          <h3 id="modal-title">{title}</h3>
          <button onClick={() => setOpen(false)} className={s.modalCloseButtonStyle}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto bg-gray-200 p-4 shadow-inner">{children}</div>
      </div>
    </div>
  )
}
