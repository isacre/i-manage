"use client";

// components/Modal.tsx
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, setOpen, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="z-100 fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity" onClick={() => setOpen(false)} />
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                {title}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all focus:outline-none"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
