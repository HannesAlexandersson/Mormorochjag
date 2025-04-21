import React from 'react';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <Image src={imageSrc} alt="Keramik Item" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default Modal;
