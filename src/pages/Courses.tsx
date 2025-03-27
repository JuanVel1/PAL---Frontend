import React, { useEffect, useState } from 'react';
import CourseCard from '../Components/CourseCard.tsx';
import CategoryButton from '../Components/CategoryButton.tsx';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getCourses } from '../Services/CourseService';
import { getCategories } from '../Services/CategoryService';

interface Category {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category_id: number;
  price: number;
  average_grade: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener cursos y categorías en paralelo
        const [coursesData, categoriesData] = await Promise.all([
          getCourses(),
          getCategories()
        ]);
        
        setCourses(coursesData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('Error al cargar los datos. Por favor intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre de la categoría por ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'General';
  };

  if (loading) return <div className="text-center py-8">Cargando cursos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to={"/"} className="text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-800">Courses</span>
        </div>

        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-gray-600 mb-6">
            Discover thousands of courses to start your learning journey
          </p>

          <div className="flex mb-8">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search for courses"
                className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={20} />
              </button>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-md">
              Search
            </button>
          </div>

          {/* Course Filters */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button className="text-gray-800 border-b-2 border-purple-600 pb-2 font-medium">
                All Courses
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <CategoryButton 
                key={category.id} 
                label={category.name} 
                // Puedes añadir onClick para filtrar por categoría si lo deseas
              />
            ))}
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                icon="code"
                category={getCategoryName(course.category_id)}
                title={course.title}
                description={course.description}
                courseId={course.id}
                price={course.price}
                averageGrade={course.average_grade}
              />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(3, 6).map((course) => (
              <CourseCard
                key={course.id}
                icon="monitor"
                category={getCategoryName(course.category_id)}
                title={course.title}
                description={course.description}
                courseId={course.id}
                price={course.price}
                averageGrade={course.average_grade}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses;