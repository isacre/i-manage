// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-5 bg-[RGBA(0,0,0,0.2)]">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-max flex-col">
        <button onClick={onClose} className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
