import { Head } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function WhoWeAre() {
    return (
        <>
            <Head title="Quiénes Somos" />
            <WelcomeHeader />
            <main className="flex-1 bg-white text-gray-800 dark:bg-black dark:text-gray-100 transition-colors duration-300">
                <div className="min-h-screen p-6">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <h1 className="text-4xl font-bold text-center mb-10">
                            ¿Quiénes Somos?
                        </h1>

                        <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-gray-700 dark:text-gray-300">
                            EMBATE es un espacio donde las ideas se transforman en emprendimientos reales. Brindamos las herramientas, el entorno y la guía necesaria para que cada emprendedor pueda incubar y lanzar su proyecto con impacto local y nacional.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg">
                            <section className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                    Misión
                                </h2>
                                <p className="text-justify text-gray-800 dark:text-gray-300">
                                    Fomentar el desarrollo de emprendedores mediante espacios de preincubación e incubación, proporcionando recursos, formación y asesoramiento para que sus ideas de negocio puedan consolidarse y proyectarse con éxito en el mercado local y nacional.
                                </p>
                            </section>

                            <section className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                    Visión
                                </h2>
                                <p className="text-justify text-gray-800 dark:text-gray-300">
                                    Ser un referente nacional en el impulso al emprendimiento, destacando como un ecosistema innovador, colaborativo y sostenible, donde las ideas se transforman en realidades empresariales con impacto social, económico y tecnológico.
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 text-lg space-y-6 text-gray-700 dark:text-gray-300">
                            <p>
                                EMBATE no solo brinda servicios, sino que construye comunidad. Apostamos por el crecimiento compartido, la innovación abierta y la vinculación con redes de incubación nacionales para seguir fortaleciendo nuestro impacto.
                            </p>
                            <p>
                                Creemos en la educación continua, en la actualización tecnológica y en el acompañamiento cercano a cada persona que se anima a emprender. Nuestro equipo trabaja con pasión, responsabilidad y visión de futuro.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <WelcomeFooter />
        </>
    );
}
