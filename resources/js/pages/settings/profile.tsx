import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layout';
import { WelcomeHeader } from '@/components/welcome-header';

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
    gender: string;
    birthdate: string;
    type_participant: string;
    career: string;
    institution: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: (auth.user.phone || '') as string,
        gender: (auth.user.gender || 'Masculino') as string,
        birthdate: (auth.user.birthdate || '') as string,
        type_participant: (auth.user.type_participant || '') as string,
        career: (auth.user.career || '') as string,
        institution: (auth.user.institution || '') as string,
    });

    // Estados para datos traídos por API
    const [participantTypes, setParticipantTypes] = useState<string[]>([]);
    const [careersList, setCareersList] = useState<string[]>([]);
    const [institutionsList, setInstitutionsList] = useState<string[]>([]);

    // Dropdown carrera
    const [filteredCareers, setFilteredCareers] = useState<string[]>([]);
    const [showCareerDropdown, setShowCareerDropdown] = useState(false);

    // Dropdown institución
    const [filteredInstitutions, setFilteredInstitutions] = useState<string[]>([]);
    const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false);

    const careerRef = useRef<HTMLDivElement>(null);
    const institutionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch tipos de participante
        axios.get('/api/participant-types').then(res => {
            setParticipantTypes(res.data.map((item: { name: string }) => item.name));
        }).catch(() => {
            // fallback o log
            setParticipantTypes(['Estudiante', 'Universitario', 'Docente', 'Administrativo', 'Emprendedor', 'Empresario']);
        });

        // Fetch carreras
        axios.get('/api/career-types').then(res => {
            const careers = res.data.map((item: { name: string }) => item.name);
            setCareersList(careers);
            setFilteredCareers(careers);
        }).catch(() => {
            const fallback = ['Ingeniería de Sistemas', 'Ingeniería Electrónica', 'Ingeniería Industrial', 'Ingeniería Civil', 'Ingeniería Mecánica'];
            setCareersList(fallback);
            setFilteredCareers(fallback);
        });

        // Fetch instituciones
        axios.get('/api/institutions').then(res => {
            const institutions = res.data.map((item: { name: string }) => item.name);
            setInstitutionsList(institutions);
            setFilteredInstitutions(institutions);
        }).catch(() => {
            setInstitutionsList([]);
            setFilteredInstitutions([]);
        });

        // Click fuera para cerrar dropdowns
        function handleClickOutside(event: MouseEvent) {
            if (careerRef.current && !careerRef.current.contains(event.target as Node)) {
                setShowCareerDropdown(false);
            }
            if (institutionRef.current && !institutionRef.current.contains(event.target as Node)) {
                setShowInstitutionDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('career', value);
        const filtered = careersList.filter(c => c.toLowerCase().includes(value.toLowerCase()));
        setFilteredCareers(filtered);
        setShowCareerDropdown(true);
    };

    const handleSelectCareer = (career: string) => {
        setData('career', career);
        setShowCareerDropdown(false);
    };

    const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('institution', value);
        const filtered = institutionsList.filter(i => i.toLowerCase().includes(value.toLowerCase()));
        setFilteredInstitutions(filtered);
        setShowInstitutionDropdown(true);
    };

    const handleSelectInstitution = (institution: string) => {
        setData('institution', institution);
        setShowInstitutionDropdown(false);
    };

    return (
        <>
            <WelcomeHeader />
            <Head title="Configuración del perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Información del perfil" description="Actualice sus datos" />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Nombre */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre completo"
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Correo electrónico"
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {/* Teléfono */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono celular</Label>
                            <Input
                                id="phone"
                                type="tel"
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="Teléfono celular"
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        {/* Género */}
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Género</Label>
                            <select
                                id="gender"
                                required
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-2"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                disabled={processing}
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            <InputError className="mt-2" message={errors.gender} />
                        </div>

                        {/* Fecha de nacimiento */}
                        <div className="grid gap-2">
                            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                            <Input
                                id="birthdate"
                                type="date"
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                value={data.birthdate}
                                onChange={(e) => setData('birthdate', e.target.value)}
                                required
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.birthdate} />
                        </div>

                        {/* Tipo de participante */}
                        <div className="grid gap-2">
                            <Label htmlFor="type_participant">Tipo de participante</Label>
                            <select
                                id="type_participant"
                                required
                                className="mt-1 block w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-2"
                                value={data.type_participant || ''}
                                onChange={(e) => setData('type_participant', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Seleccione un tipo</option>
                                {participantTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.type_participant} />
                        </div>

                        {/* Carrera */}
                        <div className="relative" ref={careerRef}>
                            <Label htmlFor="career">Carrera</Label>
                            <Input
                                id="career"
                                type="text"
                                value={data.career || ''}
                                onChange={handleCareerChange}
                                onClick={() => setShowCareerDropdown(true)}
                                placeholder="Escriba su carrera"
                                className="w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                disabled={processing}
                                autoComplete="off"
                            />
                            {showCareerDropdown && filteredCareers.length > 0 && (
                                <div className="absolute z-10 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md max-h-40 overflow-y-auto">
                                    {filteredCareers.map((career) => (
                                        <div
                                            key={career}
                                            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                                            onClick={() => handleSelectCareer(career)}
                                        >
                                            {career}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <InputError className="mt-2" message={errors.career} />
                        </div>

                        {/* Institución */}
                        <div className="relative" ref={institutionRef}>
                            <Label htmlFor="institution">Institución</Label>
                            <Input
                                id="institution"
                                type="text"
                                value={data.institution}
                                onChange={handleInstitutionChange}
                                onClick={() => setShowInstitutionDropdown(true)}
                                placeholder="Escriba su institución"
                                className="w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                                disabled={processing}
                                autoComplete="off"
                            />
                            {showInstitutionDropdown && filteredInstitutions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md max-h-40 overflow-y-auto">
                                    {filteredInstitutions.map((institution) => (
                                        <div
                                            key={institution}
                                            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
                                            onClick={() => handleSelectInstitution(institution)}
                                        >
                                            {institution}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <InputError className="mt-2" message={errors.institution} />
                        </div>

                        {/* Verificación correo */}
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm dark:text-neutral-400">
                                    Tu dirección de correo electrónico no está verificada.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500"
                                    >
                                        Haz clic aquí para reenviar el correo de verificación.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                        Un nuevo enlace de verificación ha sido enviado a tu dirección de correo electrónico.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Botones y mensaje de guardado */}
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Guardado</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}
