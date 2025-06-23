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
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from './user-menu-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

export function WelcomeHeader() {
  const { auth } = usePage<SharedData>().props;
  const url = usePage().url || window.location.pathname;

  // Menús por rol

  const adminMenus = {
    inicio: { title: 'Inicio', href: '/' },
    eventos: [
      { title: 'Eventos', href: '/events' },
      { title: 'Crear Evento', href: '/event-create' },
      { title: 'Editar Evento', href: '/all-events' },
    ],
    datos: [
      { title: 'Carreras', href: '/admin/career-types' },
      { title: 'Instituciones', href: '/admin/institutions' },
      { title: 'Ubicaciones', href: '/admin/locations' },
      { title: 'Tipos Participantes', href: '/admin/participant-types' },
      { title: 'Tipos Emprendimiento', href: '/admin/type-entrepreneurship' },
    ],
    permisos: { title: 'Dar permisos', href: '/admin/grant-permits' },
  };

  const supervisorMenus = {
    inicio: { title: 'Inicio', href: '/' },
    eventos: [
      { title: 'Eventos', href: '/events' },
      { title: 'Editar Evento', href: '/all-events' },
      { title: 'Participantes del evento', href: '/events/1/registered-users' },
    ],
    otros: [
      { title: 'Servicios', href: '/services' },
      { title: '¿Quienes somos?', href: '/whoWeAre' },
    ],
  };

  const estudianteMenus = {
    inicio: { title: 'Inicio', href: '/' },
    eventos: { title: 'Eventos', href: '/events' },
    servicios: { title: 'Servicios', href: '/services' },
    quienesSomos: { title: '¿Quienes Somos?', href: '/whoWeAre' },
  };

  let role = 'estudiante';
  if (auth.user) {
    if (auth.user.type_user_id === 1) role = 'admin';
    else if (auth.user.type_user_id === 2) role = 'supervisor';
  }

  // -------- MENÚ MÓVIL --------
  function MobileMenu() {
    if (role === 'admin') {
      return (
        <div className="flex-grow overflow-y-auto flex flex-col gap-4 pt-6 px-4">
          <Link href="/" className="mb-4 flex items-center">
            <img src="/storage/logo_embate.png" alt="Logo" className="h-16 w-auto" />
            <span className="ml-2 text-xl font-bold">Embate</span>
          </Link>

          <Link
            href={adminMenus.inicio.href}
            className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {adminMenus.inicio.title}
          </Link>

          <details className="group">
            <summary className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Eventos
            </summary>
            <nav className="pl-6 flex flex-col gap-1 mt-1">
              {adminMenus.eventos.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </details>

          <details className="group">
            <summary className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Datos
            </summary>
            <nav className="pl-6 flex flex-col gap-1 mt-1">
              {adminMenus.datos.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </details>

          <Link
            href={adminMenus.permisos.href}
            className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {adminMenus.permisos.title}
          </Link>
        </div>
      );
    }

    if (role === 'supervisor') {
      return (
        <div className="flex-grow overflow-y-auto flex flex-col gap-4 pt-6 px-4">
          <Link href="/" className="mb-4 flex items-center">
            <img src="/storage/logo_embate.png" alt="Logo" className="h-16 w-auto" />
            <span className="ml-2 text-xl font-bold">Embate</span>
          </Link>

          <Link
            href={supervisorMenus.inicio.href}
            className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {supervisorMenus.inicio.title}
          </Link>

          <details className="group">
            <summary className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Eventos
            </summary>
            <nav className="pl-6 flex flex-col gap-1 mt-1">
              {supervisorMenus.eventos.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </details>

          <details className="group">
            <summary className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Otros
            </summary>
            <nav className="pl-6 flex flex-col gap-1 mt-1">
              {supervisorMenus.otros.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      );
    }

    // ESTUDIANTE - corrijo para que funcione bien
    return (
      <div className="flex-grow overflow-y-auto flex flex-col gap-4 pt-6 px-4">
        <Link href="/" className="mb-4 flex items-center">
          <img src="/storage/logo_embate.png" alt="Logo" className="h-16 w-auto" />
          <span className="ml-2 text-xl font-bold">Embate</span>
        </Link>

        <Link
          href={estudianteMenus.inicio.href}
          className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {estudianteMenus.inicio.title}
        </Link>

        <Link
          href={estudianteMenus.eventos.href}
          className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {estudianteMenus.eventos.title}
        </Link>

        <Link
          href={estudianteMenus.servicios.href}
          className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {estudianteMenus.servicios.title}
        </Link>

        <Link
          href={estudianteMenus.quienesSomos.href}
          className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {estudianteMenus.quienesSomos.title}
        </Link>
      </div>
    );
  }

  // -------- MENÚ DESKTOP --------
  function DesktopMenu() {
    if (role === 'admin') {
      return (
        <nav className="hidden lg:flex ml-8 space-x-6 flex-wrap max-w-[60vw] overflow-x-auto">
          <Link
            href={adminMenus.inicio.href}
            className={cn(
              'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
              url === adminMenus.inicio.href && 'text-blue-600 dark:text-blue-400 font-medium'
            )}
          >
            {adminMenus.inicio.title}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
                  url.startsWith('/events') && 'text-blue-600 dark:text-blue-400 font-medium'
                )}
              >
                Eventos
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="bg-white dark:bg-gray-900 border rounded shadow-md">
              {adminMenus.eventos.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link href={item.href} className="w-full">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
                  url.startsWith('/admin') && 'text-blue-600 dark:text-blue-400 font-medium'
                )}
              >
                Datos
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="start"
              className="bg-white dark:bg-gray-900 border rounded shadow-md max-h-64 overflow-auto"
            >
              {adminMenus.datos.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link href={item.href} className="w-full">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={adminMenus.permisos.href}
            className={cn(
              'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
              url === adminMenus.permisos.href && 'text-blue-600 dark:text-blue-400 font-medium'
            )}
          >
            {adminMenus.permisos.title}
          </Link>
        </nav>
      );
    }

    if (role === 'supervisor') {
      return (
        <nav className="hidden lg:flex ml-8 space-x-6 flex-wrap max-w-[60vw] overflow-x-auto">
          <Link
            href={supervisorMenus.inicio.href}
            className={cn(
              'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
              url === supervisorMenus.inicio.href && 'text-blue-600 dark:text-blue-400 font-medium'
            )}
          >
            {supervisorMenus.inicio.title}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
                  url.startsWith('/events') && 'text-blue-600 dark:text-blue-400 font-medium'
                )}
              >
                Eventos
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="bg-white dark:bg-gray-900 border rounded shadow-md">
              {supervisorMenus.eventos.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link href={item.href} className="w-full">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
                  ['services', 'whoWeAre'].some((p) => url.includes(p)) && 'text-blue-600 dark:text-blue-400 font-medium'
                )}
              >
                Otros
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="bg-white dark:bg-gray-900 border rounded shadow-md">
              {supervisorMenus.otros.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link href={item.href} className="w-full">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      );
    }

    // Estudiante
    return (
      <nav className="hidden lg:flex ml-8 space-x-6 flex-wrap max-w-[60vw] overflow-x-auto">
        <Link
          href={estudianteMenus.inicio.href}
          className={cn(
            'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
            url === estudianteMenus.inicio.href && 'text-blue-600 dark:text-blue-400 font-medium'
          )}
        >
          {estudianteMenus.inicio.title}
        </Link>

        <Link
          href={estudianteMenus.eventos.href}
          className={cn(
            'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
            url.startsWith('/events') && 'text-blue-600 dark:text-blue-400 font-medium'
          )}
        >
          {estudianteMenus.eventos.title}
        </Link>

        <Link
          href={estudianteMenus.servicios.href}
          className={cn(
            'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
            url.startsWith('/services') && 'text-blue-600 dark:text-blue-400 font-medium'
          )}
        >
          {estudianteMenus.servicios.title}
        </Link>

        <Link
          href={estudianteMenus.quienesSomos.href}
          className={cn(
            'px-3 py-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 whitespace-nowrap',
            url.startsWith('/whoWeAre') && 'text-blue-600 dark:text-blue-400 font-medium'
          )}
        >
          {estudianteMenus.quienesSomos.title}
        </Link>
      </nav>
    );
  }

  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="mx-auto flex h-16 items-center px-4 max-w-screen-xl">
        {/* Menú móvil */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col"
            >
              <MobileMenu />

              {/* Footer con login/registro */}
              <div className="mt-auto space-y-2 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                {auth.user ? (
                  <UserDropdown user={auth.user} />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-center"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                    >
                      Crear cuenta
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (desktop) */}
        <Link href="/" className="hidden lg:flex items-center flex-shrink-0">
          <img src="/storage/logo_embate.png" alt="Logo" className="h-10 w-auto" />
          <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">Embate</span>
        </Link>

        {/* Navegación (desktop) */}
        <DesktopMenu />

        {/* Usuario */}
        <div className="ml-auto hidden lg:flex items-center gap-4 flex-shrink-0">
          {auth.user ? (
            <UserDropdown user={auth.user} />
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
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
          <span className="hidden lg:inline-block font-medium text-gray-800 dark:text-gray-100">{user.name}</span>
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
