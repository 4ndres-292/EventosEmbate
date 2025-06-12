import { Head, usePage } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function Welcome() {
    const flash = (usePage().props as { flash?: { success?: string; error?: string } }).flash ?? {};

    return (
        <>
            <Head title="Bienvenido" />

            <WelcomeHeader />

            <main className="flex-1">
                <div className="min-h-screen p-6">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {flash.success && (
                            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded shadow">
                                {flash.success}
                            </div>
                        )}

                        <h1 className="text-4xl font-bold text-center mb-8">
                            Bienvenido a nuestra plataforma
                        </h1>
                    </div>
                </div>
            </main>

            <WelcomeFooter />
        </>
    );
}
