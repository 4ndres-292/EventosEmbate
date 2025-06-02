import React from "react";

interface ModalCancelationProps {
  isOpen: boolean;
  onCancel: () => void;
  onClose: () => void;
}

const ModalCancelation: React.FC<ModalCancelationProps> = ({ isOpen, onCancel, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro de cancelar?</h2>
        <p className="text-gray-600 mb-6">Si cancelas ahora, podrías perder los cambios realizados.</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Volver
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelation;
