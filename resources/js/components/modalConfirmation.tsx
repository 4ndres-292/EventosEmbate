import React from "react";

interface ModalConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-tranparent flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro de continuar?</h2>
        <p className="text-gray-600 mb-6">Esta acción no se puede deshacer. ¿Deseas continuar?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
