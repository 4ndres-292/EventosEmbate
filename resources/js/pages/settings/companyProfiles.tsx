import { Head, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';

type CompanyForm = {
  name: string;
  description: string;
  area: string;
  location: string;
  representative: string;
  email: string;
  phone: string;
  logo?: string; // opcional
};

export default function CompanyProfiles() {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<CompanyForm>({
    name: '',
    description: '',
    area: '',
    location: '',
    representative: '',
    email: '',
    phone: '',
    logo: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('companies.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <Head title="Crear perfil de compañía" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Crear Compañía" description="Ingrese los datos para crear una compañía" />

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Compañía</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Nombre de la compañía"
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                type="text"
                required
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                disabled={processing}
                placeholder="Descripción corta"
              />
              <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="area">Área</Label>
              <Input
                id="area"
                type="text"
                required
                value={data.area}
                onChange={(e) => setData('area', e.target.value)}
                disabled={processing}
                placeholder="Área o sector de la compañía"
              />
              <InputError message={errors.area} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                type="text"
                required
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                disabled={processing}
                placeholder="Ciudad, país, etc."
              />
              <InputError message={errors.location} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="representative">Representante</Label>
              <Input
                id="representative"
                type="text"
                required
                value={data.representative}
                onChange={(e) => setData('representative', e.target.value)}
                disabled={processing}
                placeholder="Nombre del representante legal"
              />
              <InputError message={errors.representative} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled={processing}
                placeholder="contacto@compania.com"
              />
              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                disabled={processing}
                placeholder="+591 7XXXXXXX"
              />
              <InputError message={errors.phone} />
            </div>

            {/* Por ahora no implementamos logo */}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Crear Compañía
              </Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <p className="text-sm text-green-600">¡Perfil creado exitosamente!</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </>
  );
}
