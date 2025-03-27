// src/services/courseService.ts
export const getCourses = async () => {
    const response = await fetch('http://localhost:8081/api/courses/all');
    if (!response.ok) {
      throw new Error('Error al obtener los cursos');
    }
    return response.json();
  };
  