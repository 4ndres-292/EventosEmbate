import { Head } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function Services() {
    return (
        <>
            <Head title="Servicios" />
            <WelcomeHeader />
            <main className="flex-1">
                <div className="min-h-screen p-6">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <h1 className="text-4xl font-bold text-center mb-8">
                            Nuestros Servicios
                        </h1>
                        <div className="space-y-6 text-lg text-gray-700">
                            <p>✅ Consultoría personalizada para tu empresa.</p>
                            <p>✅ Desarrollo de software a medida.</p>
                            <p>✅ Servicios de mantenimiento y soporte técnico.</p>
                            <p>✅ Soluciones en la nube y transformación digital.</p>
                            <p>✅ Capacitación y formación profesional.</p>
                        </div>
                    </div>
                </div>
            </main>
            <WelcomeFooter />
        </>
    );
}
