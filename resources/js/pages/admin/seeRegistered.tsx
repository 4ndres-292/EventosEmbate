import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { WelcomeHeader } from '@/components/welcome-header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
  area: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  type_participant: string;
  company: Company | null;
}

interface Event {
  id: number;
  name_event: string;
}

export default function SeeRegistered() {
  const { props } = usePage<{ event: Event; users: User[] }>();
  const event = props.event;
  const users = props.users;

  // Filtros
  const [genderFilter, setGenderFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [ageMinFilter, setAgeMinFilter] = useState('');
  const [ageMaxFilter, setAgeMaxFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [companyAreaFilter, setCompanyAreaFilter] = useState('');

  // Datos para selects de filtros
  const [participantTypes, setParticipantTypes] = useState<string[]>([]);
  const [companyAreas, setCompanyAreas] = useState<string[]>([]);

  useEffect(() => {
    // Cargar tipos de participante
    axios.get('/api/participant-types').then((res) => {
      setParticipantTypes(res.data.map((t: { name: string }) => t.name));
    }).catch(() => {
      console.warn('No se pudo cargar participant-types');
    });
    // Cargar áreas de empresa
    axios.get('/api/typeEntrepreneurship').then((res) => {
      setCompanyAreas(res.data.map((t: { name: string }) => t.name));
    }).catch(() => {
      console.warn('No se pudo cargar typeEntrepreneurship');
    });
  }, []);

  function calcularEdad(birthdate: string): number {
    const nacimiento = new Date(birthdate);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  // Mapeo usuarios con edad
  const usersConEdad = users.map((user) => ({
    ...user,
    edad: calcularEdad(user.birthdate),
  }));

  // Filtrado considerando company?.area
  const filteredUsers = usersConEdad.filter((user) => {
    return (
      (!genderFilter || user.gender === genderFilter) &&
      (!phoneFilter || user.phone.includes(phoneFilter)) &&
      (!emailFilter || user.email.includes(emailFilter)) &&
      (!typeFilter || user.type_participant === typeFilter) &&
      (!companyAreaFilter || user.company?.area === companyAreaFilter) &&
      (!ageMinFilter || user.edad >= parseInt(ageMinFilter)) &&
      (!ageMaxFilter || user.edad <= parseInt(ageMaxFilter))
    );
  });

  function exportToPDF() {
    const doc = new jsPDF();
    doc.text(`Usuarios registrados en: ${event.name_event}`, 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          'Nombre',
          'Correo',
          'Celular',
          'Género',
          'Edad',
          'Tipo',
          'Empresa',
          'Área Empresa',
        ],
      ],
      body: filteredUsers.map((u) => [
        u.name,
        u.email,
        u.phone,
        u.gender,
        u.edad.toString(),
        u.type_participant,
        u.company?.name ?? '—',
        u.company?.area ?? '—',
      ]),
    });
    doc.save('usuarios.pdf');
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((u) => ({
        Nombre: u.name,
        Correo: u.email,
        Celular: u.phone,
        Género: u.gender,
        Edad: u.edad,
        Tipo: u.type_participant,
        Empresa: u.company?.name ?? '',
        'Área Empresa': u.company?.area ?? '',
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([excelBuffer], { type: 'application/octet-stream' }),
      'usuarios.xlsx'
    );
  }

  // Opcional: debug de props
  // useEffect(() => { console.log('Users props:', users); }, [users]);

  return (
    <>
      <Head title="Ver registrados" />
      <WelcomeHeader />
      <div className="p-6 max-w-7xl mx-auto text-black dark:text-white">
        <h1 className="text-3xl font-extrabold mb-6">
          Usuarios registrados en: {event.name_event}
        </h1>

        {/* Filtros */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          >
            <option value="">Todos los géneros</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          <input
            type="text"
            placeholder="Filtrar por celular"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          />

          <input
            type="text"
            placeholder="Buscar por dominio de correo"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          />

          <input
            type="number"
            placeholder="Edad mínima"
            value={ageMinFilter}
            onChange={(e) => setAgeMinFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          />

          <input
            type="number"
            placeholder="Edad máxima"
            value={ageMaxFilter}
            onChange={(e) => setAgeMaxFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          >
            <option value="">Todos los tipos</option>
            {participantTypes.map((tipo, idx) => (
              <option key={`${tipo}-${idx}`} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <select
            value={companyAreaFilter}
            onChange={(e) => setCompanyAreaFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          >
            <option value="">Todas las áreas</option>
            {companyAreas.map((area, idx) => (
              <option key={`${area}-${idx}`} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Botones export */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Descargar PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Descargar Excel
          </button>
        </div>

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {[
                  'Nombre',
                  'Correo',
                  'Celular',
                  'Género',
                  'Edad',
                  'Tipo de Participante',
                  'Empresa',
                  'Área Empresa',
                ].map((header, index) => (
                  <th
                    key={`th-${index}`}
                    className="px-4 py-2 text-left border-b font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr
                    key={`user-${u.id}`}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 border-b">{u.name}</td>
                    <td className="px-4 py-2 border-b">{u.email}</td>
                    <td className="px-4 py-2 border-b">{u.phone}</td>
                    <td className="px-4 py-2 border-b">{u.gender}</td>
                    <td className="px-4 py-2 border-b">{u.edad}</td>
                    <td className="px-4 py-2 border-b">{u.type_participant}</td>
                    <td className="px-4 py-2 border-b">{u.company?.name ?? '—'}</td>
                    <td className="px-4 py-2 border-b">{u.company?.area ?? '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
