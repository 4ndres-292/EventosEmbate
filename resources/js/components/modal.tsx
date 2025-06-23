export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 p-4">
            <div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl relative
                           max-w-full sm:max-w-lg
                           max-h-[80vh] overflow-auto"
            >
                <button
                    onClick={onClose}
                    aria-label="Cerrar modal"
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
