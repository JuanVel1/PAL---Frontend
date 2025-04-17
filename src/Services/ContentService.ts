const BASE_URL = 'http://localhost:8081';

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

export const getContentByCourseId = async (courseId: string) => {
    const response = await fetch(`${BASE_URL}/api/content/course/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el contenido');
    }

    return response.json();  // Regresamos la respuesta si la solicitud fue exitosa
}