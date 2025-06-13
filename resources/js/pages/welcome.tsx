import { Head, usePage } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function Welcome() {
    const flash = (usePage().props as { flash?: { success?: string; error?: string } }).flash ?? {};

    return (
        <>
            <Head title="Bienvenido" />
            <WelcomeHeader />

            <main className="flex-1 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
                <div className="min-h-screen p-6 flex items-center justify-center">
                    <div className="max-w-5xl mx-auto px-4 py-12 text-center">
                        {flash.success && (
                            <div className="mb-6 p-4 bg-green-100 text-green-800 dark:bg-green-600/20 dark:text-green-300 border rounded shadow">
                                {flash.success}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            EMBATE: Impulsamos ideas, acompañamos emprendedores
                        </h1>

                        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                            Un espacio donde las ideas se convierten en acción. Aquí encuentras el impulso, la guía y los recursos para hacer crecer tu proyecto desde cero y llevarlo al siguiente nivel.
                        </p>

                        <details className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6 mt-10 text-left max-w-3xl mx-auto border dark:border-gray-600">
                            <summary className="text-blue-600 dark:text-blue-400 font-semibold text-lg cursor-pointer">
                                Leer más sobre EMBATE
                            </summary>
                            <div className="mt-4 space-y-4 text-justify text-gray-700 dark:text-gray-300">
                                <p>
                                    EMBATE es un programa dedicado a fortalecer el ecosistema emprendedor local. Ofrecemos espacios de preincubación e incubación con orientación estratégica, asesoría experta y acompañamiento personalizado.
                                </p>
                                <p>
                                    Nuestro enfoque está en transformar ideas con potencial en negocios reales, sostenibles e innovadores que generen impacto en sus comunidades.
                                </p>
                                <p>
                                    Participamos en redes nacionales de incubación, compartimos logros, y promovemos una cultura emprendedora activa, colaborativa y con visión a largo plazo.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </main>

            <WelcomeFooter />
        </>
    );
}
