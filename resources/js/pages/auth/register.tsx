import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState, useRef, useEffect} from 'react';
import axios from 'axios';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    phone: string;
    gender: 'Masculino' | 'Femenino';
    birthdate: string;
    type_participant: string;
    career: string;
    institution: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        phone: '',
        gender: 'Masculino',
        birthdate: '',
        type_participant: '',
        career: '',
        institution: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

 // Estados para almacenar los datos de las API
 const [participantTypes, setParticipantTypes] = useState<string[]>([]);
 const [careersList, setCareersList] = useState<string[]>([]);
 const [institutionsList, setInstitutionsList] = useState<string[]>([]);

 // Estados para el filtrado de carreras e instituciones
 const [filteredCareers, setFilteredCareers] = useState<string[]>(careersList);
 const [filteredInstitutions, setFilteredInstitutions] = useState<string[]>(institutionsList);

 // Estados para mostrar los dropdowns
 const [showCareerDropdown, setShowCareerDropdown] = useState(false);
 const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false);

 // Obtener los datos de las APIs al cargar el componente
 useEffect(() => {
     axios.get('api/participant-types').then((response) => {
         setParticipantTypes(response.data.map((type: { name: string }) => type.name));
     });

     axios.get('/api/career-types').then((response) => {
         setCareersList(response.data.map((career: { name: string }) => career.name));
         setFilteredCareers(response.data.map((career: { name: string }) => career.name)); // Inicializa con todos los elementos
     });

     axios.get('/api/institutions').then((response) => {
         setInstitutionsList(response.data.map((institution: { name: string }) => institution.name));
         setFilteredInstitutions(response.data.map((institution: { name: string }) => institution.name)); // Inicializa con todos los elementos
     });
 }, []);

 const submit: FormEventHandler = (e) => {
     e.preventDefault();
     post(route('register'), {
         onFinish: () => reset('password', 'password_confirmation'),
     });
 };   

const institutionRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLDivElement>(null);

// Mostrar campo carrera si es universitario
const isUniversitario = data.type_participant === 'Universitario';

const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('career', value);
    setFilteredCareers(careersList.filter((career) => career.toLowerCase().includes(value.toLowerCase())));
    setShowCareerDropdown(true);
};

const handleSelectCareer = (career: string) => {
    setData('career', career);
    setShowCareerDropdown(false);
};

const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('institution', value);
    setFilteredInstitutions(institutionsList.filter(inst => inst.toLowerCase().includes(value.toLowerCase())));
    setShowInstitutionDropdown(true);
};

const handleSelectInstitution = (institution: string) => {
    setData('institution', institution);
    setShowInstitutionDropdown(false);
};

    return (
        <AuthLayout title="Crear una cuenta" description="Ingrese los datos a continuación para crear su cuenta">
            <Head title="Registro" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nombre completo"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono celular</Label>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            tabIndex={2}
                            autoComplete="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="Teléfono celular"
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Género</Label>
                        <select
                            id="gender"
                            required
                            tabIndex={3}
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value as 'Masculino' | 'Femenino')}
                            disabled={processing}
                            className='border p-1 rounded-md'
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                        <Input
                            id="birthdate"
                            type="date"
                            required
                            tabIndex={4}
                            autoComplete="birthdate"
                            value={data.birthdate}
                            onChange={(e) => setData('birthdate', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.birthdate} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="type_participant">Tipo de participante</Label>
                        <select
                            id="type_participant"
                            required
                            tabIndex={5}
                            value={data.type_participant || ''}
                            onChange={(e) => setData('type_participant', e.target.value)}
                            disabled={processing}
                            className="border p-1 rounded-md"
                        >
                            <option value="">Seleccione un tipo</option>
                            {participantTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.type_participant} className="mt-2" />
                    </div>

                    {isUniversitario && (
                        <div className="relative" ref={inputRef}>
                            <Label htmlFor="career">Carrera <span className="text-red-500">*</span></Label>
                            <Input
                                id="career"
                                type="text"
                                tabIndex={6}
                                value={data.career || ''}
                                required={isUniversitario}
                                onChange={handleCareerChange}
                                onClick={() => setShowCareerDropdown(true)}
                                disabled={processing}
                                placeholder="Escriba su carrera"
                                className="w-full"
                            />
                            {showCareerDropdown && filteredCareers.length > 0 && (
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
                            <InputError message={errors.career} className="mt-2" />
                        </div>
                    )}

                    <div className="relative" ref={institutionRef}>
                        <Label htmlFor="institution">Institución <span className="text-red-500">*</span></Label>
                        <Input
                            id="institution"
                            type="text"
                            tabIndex={7}
                            autoComplete="institution"
                            required
                            value={data.institution}
                            onChange={handleInstitutionChange}
                            onClick={() => setShowInstitutionDropdown(true)}
                            disabled={processing}
                            placeholder="Institución a la que pertenece"
                        />
                        {showInstitutionDropdown && filteredInstitutions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                                {filteredInstitutions.map((institution) => (
                                    <div
                                        key={institution}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectInstitution(institution)}
                                    >
                                        {institution}
                                    </div>
                                ))}
                            </div>
                        )}
                        <InputError message={errors.institution} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={8}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={9}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={10}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar contraseña"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={11} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear cuenta
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={12}>
                        Iniciar sesión
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
