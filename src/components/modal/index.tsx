// components/Modal.tsx
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-baseline justify-center z-50 bg-opacity-5 bg-[RGBA(0,0,0,0.2)]">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-3xl flex-col mt-20">
        <button onClick={onClose} className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <IoCloseSharp size={30} className="transition-transform duration-200 hover:rotate-90" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
