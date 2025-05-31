import { useEffect, useState } from "react";
import NavbarSite from "../Components/NavbarSite.tsx";
import { useParams } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export default function User() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/users/${userId}`
        );
        if (!response.ok) throw new Error("Error al obtener el usuario");

        const result = await response.json();

        if (result.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            setUser(result.data[0]);
          } else if (!Array.isArray(result.data)) {
            setUser(result.data);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <NavbarSite page={"User > Details"} />
        <p className="text-gray-600">Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <NavbarSite page={"User > Details"} />
        <p className="text-red-600">Error al cargar el usuario</p>
      </div>
    );

  if (!user)
    return (
      <div className="container mx-auto px-4 py-8">
        <NavbarSite page={"User > Details"} />
        <p className="text-gray-600">No se encontró el usuario</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <NavbarSite page={"User > Details"} />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Detalles del Usuario</h2>
          <p className="text-gray-700">ID: {user.id}</p>
          <p className="text-gray-700">Nombre: {user.username}</p>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">
            Rol:{" "}
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
              {user.roles && user.roles.length > 0
                ? user.roles[0].name
                : "Sin rol"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
