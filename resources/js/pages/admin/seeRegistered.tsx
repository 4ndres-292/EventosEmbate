import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { WelcomeHeader } from '@/components/welcome-header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  type_participant: string;
}

interface Event {
  id: number;
  name_event: string;
}

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

export default function SeeRegistered() {
  const { props } = usePage<{ event: Event; users: User[] }>();
  const event = props.event;
  const users = props.users;

  const [genderFilter, setGenderFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const usersConEdad = users.map((user) => ({
    ...user,
    edad: calcularEdad(user.birthdate),
  }));

  const tiposUnicos = Array.from(new Set(users.map((u) => u.type_participant)));
  const edadesUnicas = Array.from(new Set(usersConEdad.map((u) => u.edad))).sort((a, b) => a - b);

  const filteredUsers = usersConEdad.filter((user) => {
    return (
      (!genderFilter || user.gender === genderFilter) &&
      (!typeFilter || user.type_participant === typeFilter) &&
      (!ageFilter || user.edad === Number(ageFilter))
    );
  });

  function exportToPDF() {
    const doc = new jsPDF();
    doc.text(`Usuarios registrados en: ${event.name_event}`, 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [['Nombre', 'Correo', 'Celular', 'Género', 'Tipo', 'Edad']],
      body: filteredUsers.map((user) => [
        user.name,
        user.email,
        user.phone,
        user.gender,
        user.type_participant,
        user.edad.toString(),
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
        Tipo: u.type_participant,
        Edad: u.edad,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'usuarios.xlsx');
  }

  return (
    <>
      <Head title="Ver registrados" />
      <WelcomeHeader />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          Usuarios registrados en: {event.name_event}
        </h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Todos los géneros</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Todos los tipos</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Todas las edades</option>
            {edadesUnicas.map((edad) => (
              <option key={edad} value={edad}>{edad} años</option>
            ))}
          </select>
        </div>

        {/* Botones de exportación */}
        <div className="flex gap-4 mb-4">
          <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Descargar PDF
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Descargar Excel
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <table className="w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                {['Nombre', 'Correo', 'Celular', 'Género', 'Edad', 'Tipo de Participante'].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">{user.name}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm break-words max-w-xs">{user.email}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">{user.phone}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">{user.gender}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">{user.edad}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">{user.type_participant}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-600 dark:text-gray-400 italic">
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
