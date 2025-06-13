import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler,useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
//import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración del perfil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    phone: string;
    gender: boolean;
    birthdate: string;
    type_participant: string;
    career: string;
    institution: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    // Asegúrate de que los valores sean del tipo correcto
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name || '', // Valor por defecto si no está definido
        email: auth.user.email || '', // Valor por defecto si no está definido
        phone: (auth.user.phone || '') as string, // Tipo seguro para phone
        gender: (auth.user.gender !== undefined ? auth.user.gender : true) as boolean, // Asegúrate de que gender sea un booleano
        birthdate: (auth.user.birthdate || '') as string, // Tipo seguro para birthdate
        type_participant: (auth.user.type_participant || '') as string, // Asegura que sea un array de strings
        career: (auth.user.career || '') as string, // Asegura que sea un array de strings
        institution: (auth.user.institution || '') as string, // Tipo seguro para institution
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    ///
const careersList = ['Ingeniería de Sistemas', 
    'Ingeniería Electrónica', 
    'Ingeniería Industrial', 
    'Ingeniería Civil', 
    'Ingeniería Mecánica'];

const [showDropdown, setShowDropdown] = useState(false);
const [filteredCareers, setFilteredCareers] = useState<string[]>([]);

// Maneja cambios en el input
const handleCareerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCareer = event.target.value;
    setData((prevData) => ({ ...prevData, career: newCareer }));

    // Filtra las opciones basadas en la entrada del usuario
    const filtered = careersList.filter((career) =>
        career.toLowerCase().includes(newCareer.toLowerCase())
    );

    setFilteredCareers(filtered);
    setShowDropdown(true); // Muestra el dropdown si hay opciones
};

// Maneja la selección de una carrera
const handleSelectCareer = (career: string) => {
    setData((prevData) => ({ ...prevData, career })); // ✅ Corrige el valor
    setShowDropdown(false); // ✅ Oculta el dropdown
};

///

    return (
        <>
        <WelcomeHeader/>
            <Head title="Configuración del perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Información del perfil" description="Actualice sus datos" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre completo"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Correo electrónico"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                         {/* Teléfono */}
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono celular</Label>
                            <Input
                                id="phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="Teléfono celular"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        {/* Género */}
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Género</Label>
                            <select
                                id="gender"
                                required
                                className="mt-1 block w-full"
                                value={data.gender.toString()}
                                onChange={(e) => setData('gender', e.target.value === 'true')}
                            >
                                <option value="true">Masculino</option>
                                <option value="false">Femenino</option>
                            </select>
                            <InputError className="mt-2" message={errors.gender} />
                        </div>

                        {/* Fecha de nacimiento */}
                        <div className="grid gap-2">
                            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                            <Input
                                id="birthdate"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.birthdate}
                                onChange={(e) => setData('birthdate', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.birthdate} />
                        </div>

                        {/* Tipo de participante */}
                        <div className="grid gap-2">
                            <Label htmlFor="type_participant">Tipo de participante</Label>
                            <select
                                id="type_participant"
                                required
                                className="mt-1 block w-full"
                                value={data.type_participant || ''}
                                onChange={(e) => setData('type_participant', e.target.value)}
                            >
                                <option value="">Seleccione un tipo</option>
                                {['Estudiante', 'Universitario', 'Docente', 'Administrativo', 'Emprendedor', 'Empresario'].map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.type_participant} />
                        </div>

                        {/* Carrera */}
                        <div className="relative">
                            <Label htmlFor="career">Carrera</Label>
                            <Input
                                id="career"
                                type="text"
                                value={data.career || ""}
                                onChange={handleCareerChange}
                                onClick={() => setShowDropdown(true)}
                                placeholder="Escriba su carrera"
                                className="w-full"
                            />
                            {showDropdown && filteredCareers.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                                    {filteredCareers.map((career) => (
                                        <div
                                            key={career}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectCareer(career)}
                                        >
                                            {career}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* Institución */}
                        <div className="grid gap-2">
                            <Label htmlFor="institution">Institución</Label>
                            <Input
                                id="institution"
                                className="mt-1 block w-full"
                                value={data.institution}
                                onChange={(e) => setData('institution', e.target.value)}
                                required
                                placeholder="Institución"
                            />
                            <InputError className="mt-2" message={errors.institution} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Tu dirección de correo electrónico no está verificada.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Haz clic aquí para reenviar el correo de verificación.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un nuevo enlace de verificación ha sido enviado a tu dirección de correo electrónico.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardado</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}
