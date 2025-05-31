import { useState, useEffect } from "react";
import NavbarSite from "../Components/NavbarSite.tsx";

interface Rol {
  id: number;
  name: string;
}

export default function Users() {
  const [users, setUsers] = useState<
    {
      roles: Rol[];
      id: number;
      username: string;
      email: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/users/all");
        if (!response.ok) throw new Error("Error al obtener las categorías");

        const result = await response.json();
        if (result.data) {
          setUsers(result.data);
          console.log("Usuarios cargadas:", result.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error en la solicitud:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <NavbarSite page={"Users"} />

      <main>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">All Users</h2>
          {loading && <p className="text-gray-600">Cargando...</p>}
          {error && (
            <p className="text-red-600">Error al cargar los usuarios</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">ID: {user.id}</h2>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                    {user.roles[0]?.name || "Sin rol"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md">
            Load More Users
          </button>
        </div>
      </main>
    </div>
  );
}
