// src/components/modalSuccess.tsx
interface ModalSuccessProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export default function ModalSuccess({ isOpen, onClose, message }: ModalSuccessProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md shadow-lg text-center">
                <h2 className="text-xl font-bold text-green-600 mb-4">Registro exitoso</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
