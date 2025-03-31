import React, { useState } from 'react';
import { Button, Input, Textarea, FileInput } from '@/components/ui/placeholder-pattern';
import { usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app/app-header-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
];

export default function AdminDashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [speakers, setSpeakers] = useState<string[]>([]);  // Array de nombres de oradores
    const { auth } = usePage();

    const handleSubmit = () => {
        // Aquí enviarías el formulario al servidor para crear un evento
        console.log({ title, description, photo, speakers });
        // Lógica para enviar la data al servidor (ejemplo con axios o fetch)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                
                {/* Formulario de creación de evento */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold">Crear Evento</h2>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium">Título</label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ingresa el título del evento"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ingresa la descripción del evento"
                            />
                        </div>

                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium">Foto</label>
                            <FileInput
                                id="photo"
                                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                                accept="image/*"
                            />
                        </div>

                        <div>
                            <label htmlFor="speakers" className="block text-sm font-medium">Ponentes</label>
                            <Input
                                id="speakers"
                                type="text"
                                value={speakers.join(', ')}
                                onChange={(e) => setSpeakers(e.target.value.split(',').map(item => item.trim()))}
                                placeholder="Ingresa los ponentes, separados por coma"
                            />
                        </div>

                        <Button type="submit" onClick={handleSubmit}>Crear Evento</Button>
                    </form>
                </div>

                {/* Lista de eventos */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Eventos Existentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border p-4 rounded-xl shadow-md">
                            <PlaceholderPattern className="w-full h-40 mb-4" />
                            <h3 className="font-medium">Evento Ejemplo</h3>
                            <p className="text-sm text-neutral-500">Descripción breve del evento...</p>
                            <div className="mt-4 flex justify-between">
                                <Button variant="outline" size="sm">Editar</Button>
                                <Button variant="outline" size="sm" color="red">Eliminar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
