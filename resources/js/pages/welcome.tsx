import { Head } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header'; // Importa el nuevo componente
import { WelcomeFooter } from '@/components/welcome-footer';

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenido" />
            
            <WelcomeHeader /> {/* Usa el nuevo componente de header */}
            
            <main className = "flex-1">
                <div className="min-h-screen p-6">
                    {/* Contenido principal de tu página de bienvenida */}
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <h1 className="text-4xl font-bold text-center mb-8">
                            Bienvenido a nuestra plataforma
                        </h1>
                        {/* Agrega aquí el resto de tu contenido */}
                    </div>
                </div>
            </main>

            <WelcomeFooter />
        </>
    );
}