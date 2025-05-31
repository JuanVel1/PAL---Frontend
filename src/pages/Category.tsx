import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/categories/all"
        );
        if (!response.ok) throw new Error("Error al obtener las categorías");

        const result = await response.json();
        if (result.data) {
          setCategories(result.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      {loading && (
        <p className="text-center text-gray-600">Cargando categorías...</p>
      )}
      {error && (
        <p className="text-center text-red-500">Error al cargar categorías</p>
      )}
      {categories.length > 0 ? (
        <ul className="list-disc pl-5">
          {categories.map((category, index) => (
            <li key={index} className="text-lg text-gray-700">
              {category.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          No hay cursos disponibles en esta categoría.
        </p>
      )}
    </div>
  );
}
