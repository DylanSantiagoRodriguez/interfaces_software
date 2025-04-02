import { Book, BookSearchParams } from '../types/book';

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

interface GoogleBooksResponse {
  items?: GoogleBook[];
  totalItems?: number;
}

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    categories?: string[];
    publishedDate?: string;
    averageRating?: number;
    pageCount?: number;
    language?: string;
    publisher?: string;
  };
  saleInfo?: {
    buyLink?: string;
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
  };
}

/**
 * Busca libros en la API de Google Books
 * @param query Términos de búsqueda
 * @param maxResults Máximo de resultados (default: 20)
 * @param startIndex Índice de inicio para paginación (default: 0)
 * @returns Promise con array de libros adaptados
 */
export async function searchBooks(query: string, maxResults: number = 12, startIndex: number = 0): Promise<Book[]> {
  try {
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.searchParams.append('q', encodeURIComponent(query));
    url.searchParams.append('maxResults', maxResults.toString());
    url.searchParams.append('key', process.env.GOOGLE_BOOKS_API_KEY!);
    url.searchParams.append('startIndex', startIndex.toString());

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items?.map(adaptGoogleBook) || [];

  } catch (error) {
    console.error('Error en searchBooks:', error);
    throw new Error('Failed to fetch books');
  }
}

/**
 * Obtiene un libro por ID desde la API de Google Books
 * @param id ID del libro
 * @returns Promise con el libro o null si no se encuentra
 */
export async function getBookById(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GoogleBook = await response.json();
    return adaptGoogleBook(data);
  } catch (error) {
    console.error('Error en getBookById:', error);
    throw new Error('Error al obtener libro');
  }
}

/**
 * Adapta un libro de la API de Google al formato interno
 * @param googleBook Libro de la API de Google
 * @returns Libro en formato interno
 */
export function adaptGoogleBook(googleBook: GoogleBook): Book {
  return {
    id: googleBook.id,
    title: googleBook.volumeInfo.title || 'Título desconocido',
    author: googleBook.volumeInfo.authors?.join(', ') || 'Autor desconocido',
    description: googleBook.volumeInfo.description || 'Descripción no disponible',
    coverImage: googleBook.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || '/default-book-cover.jpg',
    genres: googleBook.volumeInfo.categories || [],
    publishedYear: googleBook.volumeInfo.publishedDate 
      ? parseInt(googleBook.volumeInfo.publishedDate.substring(0, 4)) || 0 
      : 0,
    rating: googleBook.volumeInfo.averageRating,
    pages: googleBook.volumeInfo.pageCount,
    language: googleBook.volumeInfo.language,
    publisher: googleBook.volumeInfo.publisher,
    buyLink: googleBook.saleInfo?.buyLink,
    price: googleBook.saleInfo?.listPrice?.amount 
      ? `${googleBook.saleInfo.listPrice.amount} ${googleBook.saleInfo.listPrice.currencyCode}`
      : undefined
  };
}


export async function advancedBookSearch(params: BookSearchParams): Promise<Book[]> {
  const { query, maxResults = 20, startIndex = 0 } = params;
  return searchBooks(query, maxResults, startIndex);
}