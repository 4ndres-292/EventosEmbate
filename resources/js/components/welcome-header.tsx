import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import AppLogo from './app-logo';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';

export function WelcomeHeader() {
    const { auth } = usePage<SharedData>().props;

    // Elementos de navegación
    const navItems = [
        {
            title: 'Inicio',
            href: '/',
        },
        {
            title: 'Eventos',
            href: '/events',
        },
        {
            title: 'Servicios',
            href: '/services',
        },
        {
            title: '¿Quienes somos?',
            href: '/whoWeAre',
        },
    ];

    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                {/* Menú móvil */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <div className="flex h-full flex-col gap-4 pt-6">
                                <Link href="/" className="mb-4">
                                    <AppLogo />
                                </Link>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="px-4 py-2 hover:bg-gray-100 rounded"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                <div className="mt-auto space-y-2">
                                    {auth.user ? (
                                        <Link
                                            href="/dashboard"
                                            className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="block w-full px-4 py-2 text-center text-gray-600 hover:bg-gray-100 rounded"
                                            >
                                                Iniciar sesión
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                Crear cuenta
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/storage/events/logo_embate.png"
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </Link>


                {/* Navegación desktop */}
                <nav className="hidden lg:flex ml-8 space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                'px-3 py-2 hover:text-blue-600 transition-colors',
                                usePage().url === item.href && 'text-blue-600 font-medium'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Botones de autenticación */}
                <div className="ml-auto flex items-center gap-4">
                    {auth.user ? (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hidden lg:inline-block"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-gray-600 hover:text-blue-600 hidden lg:inline-block"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hidden lg:inline-block"
                            >
                                Crear cuenta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}