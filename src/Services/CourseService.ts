export const getCourses = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/courses/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Necesario para cookies/sesión
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`Error ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Error al obtener los cursos: ' + error);
  }
};