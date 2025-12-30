"use client";

import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalProps{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({isOpen, onClose, title, children}: ModalProps) {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative">

        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-(--font-color)">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl leading-none"
          >
            <IoIosClose />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>

      </div>
    </div>
  );
}
