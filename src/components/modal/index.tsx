"use client"

import { useEffect, useRef } from "react"
import { IoClose } from "react-icons/io5"
import * as s from "./styles"

interface ModalProps {
  isOpen: boolean
  setOpen: Function
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, setOpen, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Trap focus inside the modal so screen readers will read only the modal's content, also, making it better for acessible navigation
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", trapFocus)
    first?.focus()

    return () => {
      document.removeEventListener("keydown", trapFocus)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={s.wrapperStyle} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={s.backgroundStyle} onClick={() => setOpen(false)} />
      <div className={s.flexContainerStyle}>
        <div ref={modalRef} className={s.modalStyle}>
          <div className={s.modalContentStyle}>
            <div className={s.modalHeaderStyle}>
              <h3 className={s.modalTitleStyle} id="modal-title">
                {title}
              </h3>
              <button onClick={() => setOpen(false)} className={s.modalCloseButtonStyle}>
                <IoClose size={24} />
              </button>
            </div>
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
