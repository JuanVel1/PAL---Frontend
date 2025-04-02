import { useParams } from "react-router-dom";
import  {useEffect, useState} from "react";


export default function CategoryPage() {
    const { categoryName } = useParams();
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/categories/categoryName");
                if (!response.ok) throw new Error("Error al obtener las categorías");

                const result = await response.json();
                if (result.data) {
                    setCategories(result.data);
                    console.log("Categorías cargadas:", result.data);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error("Error en la solicitud:", err);
            }
        };

        fetchCategories();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
            {categories.length > 0 ? (
                <ul className="list-disc pl-5">
                    {categories.map((category, index) => (
                        <li key={index} className="text-lg text-gray-700">{category.name}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No hay cursos disponibles en esta categoría.</p>
            )}
        </div>
    );
}
