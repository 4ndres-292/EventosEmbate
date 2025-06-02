import { Head } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function WhoWeAre() {
    return (
        <>
            <Head title="Quiénes Somos" />
            <WelcomeHeader />
            <main className="flex-1">
                <div className="min-h-screen p-6">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <h1 className="text-4xl font-bold text-center mb-8">
                            Quiénes Somos
                        </h1>
                        <div className="space-y-6 text-lg text-gray-700">
                            <p>Somos una empresa comprometida con la innovación y la excelencia tecnológica.</p>
                            <p>Contamos con un equipo multidisciplinario con más de 10 años de experiencia en el sector.</p>
                            <p>Nuestra misión es brindar soluciones digitales que impulsen el crecimiento de nuestros clientes.</p>
                            <p>Trabajamos con valores como la transparencia, la responsabilidad y la mejora continua.</p>
                        </div>
                    </div>
                </div>
            </main>
            <WelcomeFooter />
        </>
    );
}
