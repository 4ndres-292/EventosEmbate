import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    phone: string;
    gender: boolean;
    birthdate: string;
    //type_participant: ;
    //career: ;
    //institution: ;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        phone: '',
        gender: true,
        birthdate: '',
        //type_participant: '',
        //career: '',
        //institution: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
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
                            autoFocus
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
                            autoFocus
                            tabIndex={3}
                            value={data.gender.toString()}
                            onChange={(e) => setData('gender', e.target.value === 'true')}
                            disabled={processing}
                            className='border p-1 rounded-md'
                        >
                            <option value="true">Masculino</option>
                            <option value="false">Femenino</option>
                        </select>
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                        <Input
                            id="birthdate"
                            type="date"
                            required
                            autoFocus
                            tabIndex={4}
                            autoComplete="birthdate"
                            value={data.birthdate}
                            onChange={(e) => setData('birthdate', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.birthdate} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
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
                            tabIndex={3}
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
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar contraseña"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear cuenta
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Iniciar sesión
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
