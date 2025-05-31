import React, {useEffect, useState} from 'react';
import CourseCard from '../Components/CourseCard.tsx';
import CategoryButton from '../Components/CategoryButton.tsx';
import NavbarSite from '../Components/NavbarSite.tsx';
import {Search} from "lucide-react"

interface Category {
    id: number;
    name: string;
}

interface Instructor {
    id: number;
    username: string;
    email: string;
    roles: Array<any>;
}

interface Course {
    id: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    instructor: Instructor;
    status: string;
    average_grade: number;
}

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryError, setCategoryError] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/courses/all");
                if (!response.ok) throw new Error("Error al obtener los cursos");

                const result = await response.json();
                if (result.data) {
                    setCourses(result.data);
                } else {
                    setCourses([]);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/categories/all");
                if (!response.ok) throw new Error("Error al obtener categorías");

                const result = await response.json();
                if (result.data) {
                    setCategories(result.data);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                setCategoryError(true);
            }
        };

        fetchCategories();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <main className="container mx-auto px-4 py-8">
                <NavbarSite page={"Courses"}/>

                <section className="mb-12">
                    <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
                    <p className="text-gray-600 mb-6">Discover thousands of courses to start your learning
                        journey</p>

                    <div className="flex mb-8">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search for courses"
                                className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Search size={20}/>
                            </button>
                        </div>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-md">Search
                        </button>
                    </div>

                    {/* Course Filters */}
                    <div className="border-b border-gray-200 mb-8">
                        <div className="flex space-x-8">
                            <button className="text-gray-800 border-b-2 border-purple-600 pb-2 font-medium">All
                                Courses
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Popular</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">New</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Free</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Premium</button>
                        </div>
                    </div>
                </section>
                {/* Categories */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        {
                            !categoryError && categories.length > 0 ?
                                categories.map((category) => (
                                    <CategoryButton key={category.id} label={category.name}/>
                                )) :
                                <div className="flex justify-center mt-6">
                                    <p>
                                        No se encontraron categorías
                                    </p>
                                </div>
                        }
                    </div>
                </section>

                {/* Featured Courses Section */}
                <h2 className="text-xl font-bold mb-6">Featured Courses</h2>
                <section className="mb-12">
                    {
                        !loading && !error && courses.length > 0 ?

                            courses.map((course: Course) => (
                                <CourseCard
                                    key={course.id}
                                    icon="code"
                                    category={course.category.name}
                                    title={course.title}
                                    description={course.description}
                                    courseId={course.id.toString()}
                                    price={course.price}
                                    averageGrade={course.average_grade}
                                />))
                            :
                            <div className="flex justify-center mt-6">
                                <p>
                                    No se encontraron cursos
                                </p>
                            </div>
                    }
                </section>


                {/* Most Popular Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Most Popular</h2>
                    {
                        !loading && !error && courses.length > 0 ?
                            
                            //Ordena los cursos en orden descendente según la calificación promedio (average_grade), de mayor a menor
                            courses.sort((a: Course, b: Course) => b.average_grade - a.average_grade).slice(0, 3).map((course: Course) => (
                                <CourseCard
                                    key={course.id}
                                    icon="star"
                                    category={course.category.name}
                                    title={course.title}
                                    description={course.description}
                                    courseId={course.id.toString()}
                                    price={course.price}
                                    averageGrade={course.average_grade}
                                />
                            ))

                            :
                            <div className="flex justify-center mt-6">
                                <p>
                                    No se encontraron cursos
                                </p>
                            </div>
                    }

                </section>

                {/* Load More Button */}
                <div className="flex justify-center">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md">
                        Load More Courses
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Courses;