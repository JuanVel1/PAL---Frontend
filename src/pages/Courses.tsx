import React, { useEffect, useState } from 'react';
import CourseCard from '../Components/CourseCard.tsx';
import { Link } from 'react-router-dom';
import { getCourses, createCourse, updateCourse, deleteCourse, addContent } from '../Services/CourseService';
import { categoryService, Category, ApiResponse } from '../Services/CategoryService';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para el nuevo curso y el curso en edición
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: 0,
    category_name: '', // Solo almacenamos el nombre de la categoría
    instructor_id: 1,
    average_grade: 5,
    status: 'activo',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Estado para el contenido
  const [content, setContent] = useState({
    type: '',
    url: '',
  });

  const [isAddingContent, setIsAddingContent] = useState(false); // Estado para mostrar formulario de agregar contenido

  // Obtener los cursos y categorías al cargar la página
  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        const coursesData = await getCourses();
        const categoriesData: ApiResponse<Category> = await categoryService.getCategories();
        setCourses(coursesData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error('Error al obtener los cursos o categorías', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndCategories();
  }, []);

  // Crear un nuevo curso
  const handleCreateCourse = async () => {
    try {
      await createCourse({ ...newCourse, category: newCourse.category_name, instructorId: newCourse.instructor_id });
      // Llamamos a fetchCoursesAndCategories para actualizar la lista de cursos
      await fetchCoursesAndCategories();
      setNewCourse({
        title: '',
        description: '',
        price: 0,
        category_name: '',
        instructor_id: 1,
        average_grade: 5,
        status: 'activo',
      });
    } catch (error) {
      console.error('Error al crear el curso', error);
    }
  };

  // Eliminar un curso
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      // Llamamos a fetchCoursesAndCategories para actualizar la lista de cursos
      await fetchCoursesAndCategories();
    } catch (error) {
      console.error('Error al eliminar el curso', error);
    }
  };

  // Actualizar un curso
  const handleUpdateCourse = async () => {
    if (editingCourse) {
      try {
        await updateCourse(editingCourse.id, { ...newCourse, category: newCourse.category_name, instructorId: newCourse.instructor_id });
        // Llamamos a fetchCoursesAndCategories para actualizar la lista de cursos
        await fetchCoursesAndCategories();
        setIsEditing(false);
        setEditingCourse(null);
      } catch (error) {
        console.error('Error al actualizar el curso', error);
      }
    }
  };

  // Editar un curso
  const handleEditCourse = (course: any) => {
    setIsEditing(true);
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      category_name: course.category_name, // Solo asignamos el nombre de la categoría
      instructor_id: course.instructor_id,
      average_grade: course.average_grade,
      status: course.status,
    });
  };

  // Manejar el cambio en los campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev: any) => ({ ...prev, [name]: value }));
  };

  // Manejar el cambio de categoría en el formulario
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    setNewCourse((prev) => ({
      ...prev,
      category_name: selectedCategoryName, // Solo guardamos el nombre de la categoría
    }));
  };

  // Cambios en los campos de contenido
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  // Mostrar el formulario de agregar contenido
  const handleAddContent = async (courseId: string) => {
    try {
        await addContent(courseId, content);  // Se pasa `courseId` y el contenido
        await fetchCoursesAndCategories();    // Refrescar la lista de cursos
        setContent({
            type: '',
            fileUrl: '',
        });
        setIsAddingContent(false);
    } catch (error) {
        console.error('Error al agregar contenido', error);
    }
};

  // Refrescar la lista de cursos y categorías
  const fetchCoursesAndCategories = async () => {
    try {
      setLoading(true); // Mostrar loading mientras se hace la solicitud
      const coursesData = await getCourses();
      const categoriesData: ApiResponse<Category> = await categoryService.getCategories();
      setCourses(coursesData.data);
      setCategories(categoriesData.data);
    } catch (error) {
      console.error('Error al obtener los cursos o categorías', error);
    } finally {
      setLoading(false); // Ocultar loading cuando termine la solicitud
    }
  };

  if (loading) return <p>Cargando cursos...</p>;

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

        {/* Formulario para Crear Curso */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Create a New Course</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Course Title"
              className="px-4 py-2 border border-gray-300 rounded"
              value={newCourse.title}
              onChange={handleInputChange}
              name="title"
            />
            <textarea
              placeholder="Course Description"
              className="px-4 py-2 border border-gray-300 rounded"
              value={newCourse.description}
              onChange={handleInputChange}
              name="description"
            />
            <input
              type="number"
              placeholder="Course Price"
              className="px-4 py-2 border border-gray-300 rounded"
              value={newCourse.price}
              onChange={handleInputChange}
              name="price"
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded"
              value={newCourse.category_name}  // Usamos category_name aquí
              onChange={handleCategoryChange}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreateCourse}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              Create Course
            </button>
          </div>
        </section>

        {/* Lista de cursos */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border p-4 rounded-lg">
                <CourseCard
                  icon="code"
                  category={course.category_name} 
                  title={course.title}
                  description={course.description}
                  courseId={course.id}
                  price={course.price}
                  averageGrade={course.average_grade}
                />
                {/* Mostrar contenido del curso */}
                {course.content && course.content.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Content:</h4>
                    <ul>
                      {course.content.map((item: any, index: number) => (
                        <li key={index}>
                          <strong>{item.type}:</strong> <a href={item.fileUrl} target="_blank" className="text-blue-600">{item.fileUrl}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsAddingContent(true)}
                    className="text-green-600"
                  >
                    Add Content
                  </button>
                </div>
                {isAddingContent && (
                  <div>
                    <h3>Add Content</h3>
                    <input
                      type="text"
                      placeholder="Content Type"
                      value={content.type}
                      onChange={handleContentChange}
                      name="type"
                    />
                    <input
                      type="text"
                      placeholder="Content URL"
                      value={content.url}
                      onChange={handleContentChange}
                      name="url"
                    />
                    <button
                      onClick={() => handleAddContent(course.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
                    >
                      Add Content
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Formulario de Edición de Curso */}
        {isEditing && editingCourse && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">Edit Course</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                className="px-4 py-2 border border-gray-300 rounded"
                value={newCourse.title}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Course Description"
                className="px-4 py-2 border border-gray-300 rounded"
                value={newCourse.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Course Price"
                className="px-4 py-2 border border-gray-300 rounded"
                value={newCourse.price}
                onChange={handleInputChange}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded"
                value={newCourse.category_name} // Usamos category_name aquí también
                onChange={handleCategoryChange}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUpdateCourse}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
              >
                Update Course
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md"
              >
                Cancel
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Courses;
