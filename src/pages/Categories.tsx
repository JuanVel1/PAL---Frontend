import React, {useEffect, useState} from "react";
import {Plus} from "lucide-react";
import NavbarSite from "../Components/NavbarSite.tsx";
import CategoryButton from "../Components/CategoryButton.tsx";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/categories/all");
                if (!response.ok) throw new Error("Error al obtener las categorías");

                const result = await response.json();
                if (result.data) {
                    setCategories(result.data);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="">
                <NavbarSite page={"Categories"}/>

                <p className="text-gray-600 mb-6">Explora las categorías de cursos</p>

                {loading && <p className="text-center text-gray-600">Cargando categorías...</p>}
                {error && <p className="text-center text-red-500">Error al cargar categorías</p>}

                {!loading && !error && categories.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <CategoryButton key={category.id} label={category.name}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center mt-6">
                        <button
                            className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white shadow-lg">
                            <Plus size={32}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
