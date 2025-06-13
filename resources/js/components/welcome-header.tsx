import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from './user-menu-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

export function WelcomeHeader() {
    const { auth, url } = usePage<SharedData>().props;

    const navItemsAdmin = [
        { title: 'Inicio', href: '/' },
        { title: 'Eventos', href: '/events' },
        { title: 'Crear Evento', href: '/event-create' },
        { title: 'Editar Evento', href: '/all-events' },
        { title: 'Dar permisos', href: '/admin/grant-permits' },
        { title: 'Servicios', href: '/services' },
        { title: '¿Quienes somos?', href: '/whoWeAre' },
    ];

    const navItemsSupervisor = [
        { title: 'Inicio', href: '/' },
        { title: 'Eventos', href: '/events' },
        { title: 'Editar Evento', href: '/all-events' },
        { title: 'Participantes del evento', href: '/events/1/registered-users' },
        { title: 'Servicios', href: '/services' },
        { title: '¿Quienes somos?', href: '/whoWeAre' },
    ];

    const navItemsEstudiante = [
        { title: 'Inicio', href: '/' },
        { title: 'Eventos', href: '/events' },
        { title: 'Servicios', href: '/services' },
        { title: '¿Quienes somos?', href: '/whoWeAre' },
    ];

    let navItems = navItemsEstudiante;

    if (auth.user) {
        if (auth.user.type_user_id === 1) navItems = navItemsAdmin;
        else if (auth.user.type_user_id === 2) navItems = navItemsSupervisor;
    }

    return (
        <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                {/* Menú móvil */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        >
                            <div className="flex h-full flex-col gap-4 pt-6">
                                <Link href="/" className="mb-4 flex items-center">
                                    <img
                                        src="/storage/app/public/logo_embate.png"
                                        alt="Logo"
                                        className="h-10 w-auto"
                                    />
                                    <span className="ml-2 text-lg font-bold">Embate</span>
                                </Link>

                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {item.title}
                                    </Link>
                                ))}

                                <div className="mt-auto space-y-2">
                                    {auth.user ? (
                                        <UserDropdown user={auth.user} />
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                Iniciar sesión
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

                {/* Logo (desktop) */}
                <Link href="/" className="hidden lg:flex items-center">
                    <img
                        src="/storage/logo_embate.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                    <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                        Embate
                    </span>
                </Link>

                {/* Navegación (desktop) */}
                <nav className="hidden lg:flex ml-8 space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200',
                                url === item.href && 'text-blue-600 dark:text-blue-400 font-medium'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Usuario */}
                <div className="ml-auto hidden lg:flex items-center gap-4">
                    {auth.user ? (
                        <UserDropdown user={auth.user} />
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

function UserDropdown({ user }: { user: SharedData['auth']['user'] }) {
    const initials = useInitials()(user.name);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline-block font-medium text-gray-800 dark:text-gray-100">
                        {user.name}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
