// src/services/courseService.ts

const BASE_URL = 'http://localhost:8081';

// Función para convertir un objeto a x-www-form-urlencoded
const toUrlEncoded = (obj: any) => {
    return Object.keys(obj)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
        .join('&');
};

// Interfaces para tipado
interface ApiResponse<T> {
    message: string;
    data: T[];
}

interface Course {
    id?: string;
    title: string;
    category: string;
    instructorId: number;
    description: string;
    price: number;
    status: string;
    average_grade: number;
}

// Función genérica para manejar respuestas
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error desconocido');
    }
    const data = await response.json();
    return data; // Retornamos directamente la estructura { message, data }
};

// Obtener todos los cursos
export const getCourses = async (): Promise<ApiResponse<Course>> => {
    const response = await fetch(`${BASE_URL}/api/courses/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    return handleResponse<Course>(response); // Devuelve la respuesta completa (message, data)
};

// Crear un nuevo curso
export const createCourse = async (courseData: Course): Promise<ApiResponse<Course>> => {
    console.log(courseData);
    const response = await fetch(`${BASE_URL}/api/courses/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: toUrlEncoded(courseData)
    });
    return handleResponse<Course>(response); // Devuelve la respuesta completa (message, data)
};

// Actualizar un curso
export const updateCourse = async (courseId: string, courseData: Course): Promise<ApiResponse<Course>> => {
    console.log(courseData);
    const response = await fetch(`${BASE_URL}/api/courses/update/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: toUrlEncoded(courseData)
    });
    return handleResponse<Course>(response); // Devuelve la respuesta completa (message, data)
};

// Eliminar un curso
export const deleteCourse = async (courseId: string): Promise<ApiResponse<Course>> => {
    const response = await fetch(`${BASE_URL}/api/courses/delete/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return handleResponse<Course>(response); // Devuelve la respuesta completa (message, data)
};

export const addContent = async (courseId: string, content: { type: string, fileUrl: string }) => {
    const response = await fetch(`${BASE_URL}/api/content/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Indicamos que se está enviando JSON
        },
        credentials: 'include',
        body: JSON.stringify({
            courseId,  // ID del curso
            type: content.type,  // Tipo de archivo (ej. .mp3)
            fileUrl: content.fileUrl,  // URL del archivo
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar el contenido');
    }

    return response.json();  // Regresamos la respuesta si la solicitud fue exitosa
};