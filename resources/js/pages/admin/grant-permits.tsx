import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WelcomeHeader } from '@/components/welcome-header';

interface User {
  id: number;
  name: string;
  email: string;
  type_user_id: number;
}

export default function ManageUserRoles() {
  const [searchEmail, setSearchEmail] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

  // Buscar usuarios cada vez que cambia searchEmail (con debounce simple)
  useEffect(() => {
    if (searchEmail.length < 3) {
      setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      axios.get('/users/search', { params: { email: searchEmail } })
        .then(res => {
          setUsers(res.data);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchEmail]);

  const changeUserRole = (userId: number, roleId: number) => {
    setUpdatingUserId(userId);
    axios.post('/users/update-role', { user_id: userId, type_user_id: roleId })
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, type_user_id: roleId } : user
          )
        );
      })
      .finally(() => setUpdatingUserId(null));
  };

  return (
    <>
    <WelcomeHeader/>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar usuarios y cambiar rol</h1>

      <Input
        type="text"
        placeholder="Buscar usuario por correo..."
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="mb-6"
      />

      {loading && <p>Cargando usuarios...</p>}

      {users.length === 0 && searchEmail.length >= 3 && !loading && (
        <p>No se encontraron usuarios.</p>
      )}

      <div className="space-y-4">
        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">
                Rol actual: {user.type_user_id === 1 ? 'Administrador' : user.type_user_id === 2 ? 'Supervisor' : 'Estudiante'}
              </p>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map(roleId => (
                <Button
                  key={roleId}
                  disabled={updatingUserId === user.id || user.type_user_id === roleId}
                  variant={user.type_user_id === roleId ? 'default' : 'outline'}
                  onClick={() => changeUserRole(user.id, roleId)}
                >
                  {roleId === 1 ? 'Administrador' : roleId === 2 ? 'Supervisor' : 'Estudiante'}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
