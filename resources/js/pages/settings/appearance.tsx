import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de apariencia',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <>
        <WelcomeHeader/>
            <Head title="Configuración de apariencia" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Configuración de apariencia" description="Actualiza la configuración de apariencia de tu cuenta" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </>
    );
}
