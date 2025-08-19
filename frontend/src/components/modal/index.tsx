"use client"
import { IoClose } from "react-icons/io5"
import { IoArrowBack } from "react-icons/io5"
import * as s from "./styles"
import { useState } from "react"

interface ModalProps {
  isOpen: boolean
  setOpen: Function
  title: string
  children: React.ReactNode
  returnFunction?: () => void
  loadingDependencies?: any[]
}

export default function Modal({ isOpen, setOpen, title, children, returnFunction, loadingDependencies }: ModalProps) {
  if (!isOpen) return null
  return (
    <div className={s.wrapperStyle} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={s.backgroundStyle} onClick={() => setOpen(false)} />
      <div className={s.modalContentStyle}>
        <div className={s.modalHeaderStyle}>
          <h3 id="modal-title" className="flex items-center gap-2">
            {returnFunction && <IoArrowBack className="cursor-pointer" size={24} onClick={() => returnFunction()} />}
            {title}
          </h3>
          <button onClick={() => setOpen(false)} className={s.modalCloseButtonStyle}>
            <IoClose size={24} />
          </button>
        </div>
        <main className="max-h-[80vh] overflow-y-auto bg-gray-200 p-4 shadow-inner">
          {loadingDependencies?.some((item) => item) ? <div>Loading...</div> : children}
        </main>
      </div>
    </div>
  )
}
