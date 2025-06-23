import { Head, Link, router } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { WelcomeHeader } from '@/components/welcome-header';

export default function JoinOrCreateCompany() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 2) {
        fetch(route('companies.search') + `?query=${search}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
      } else {
        setResults([]);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [search]);

  const joinCompany = (companyId: number) => {
    router.post(route('companies.join'), { company_id: companyId });
  };

  return (
    <>
    <WelcomeHeader/>
      <Head title="Unirse o crear empresa" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="¿Ya formas parte de una empresa/emprendimiento?"
            description="Busca tu empresa o crea una nueva si no existe."
          />

          <div className="grid gap-4">
            <Input
              type="text"
              placeholder="Buscar empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {results.length > 0 && (
              <ul className="border rounded-lg divide-y dark:divide-gray-700">
                {results.map((company) => (
                  <li
                    key={company.id}
                    className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span>{company.name}</span>
                    <Button size="sm" onClick={() => joinCompany(company.id)}>
                      Unirse
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {search.length >= 2 && results.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No se encontraron resultados
              </div>
            )}
          </div>

          <div className="pt-4 border-t dark:border-gray-700">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              ¿No encuentras tu empresa?
            </p>

            <Link href={route('company.profiles')}>
              <Button variant="outline">Crear nueva empresa/emprendimiento</Button>
            </Link>
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}
