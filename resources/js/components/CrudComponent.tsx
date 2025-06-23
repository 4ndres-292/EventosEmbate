import { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
}

interface CrudComponentProps {
  endpoint: string;         // Ej: '/api/career-types'
  title: string;            // Ej: 'Carreras'
  singularName?: string;    // Ej: 'carrera' → para mensajes
}

export default function CrudComponent({ endpoint, title, singularName = 'registro' }: CrudComponentProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(endpoint);
    setItems(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId === null) {
        await axios.post(endpoint, { name });
      } else {
        await axios.put(`${endpoint}/${editingId}`, { name });
      }

      setName('');
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleEdit = (item: Item) => {
    setName(item.name);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm(`¿Estás seguro de eliminar este ${singularName}?`)) {
      await axios.delete(`${endpoint}/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de {title}</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder={`Nombre del ${singularName}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
