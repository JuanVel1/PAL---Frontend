// src/services/categoryService.ts

const BASE_URL = 'http://localhost:8081';  // Asegúrate de que esta URL es correcta para tu backend

// Definir la interfaz para la respuesta de la API
export interface ApiResponse<T> {
  message: string;  // Mensaje de la respuesta
  data: T[];        // Los datos que contienen las categorías
}

// Interfaz para la categoría
export interface Category {
  id: number;
  name: string;
}

// Servicio de categorías
export const categoryService = {
  // Obtener todas las categorías
  async getCategories(): Promise<ApiResponse<Category>> {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Si tu API requiere autenticación o cookies
      });

      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }

      // Retorna la respuesta completa con message y data
      const data = await response.json();
      return data;  // Asegúrate de que esta respuesta tenga la forma { message, data }
      
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;  // Propagar el error para que sea manejado en el componente
    }
  }
};
