export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    genres: string[];
    publishedYear: number;
    rating?: number;
    pages?: number;
    language?: string;
    publisher?: string;
    buyLink?: string;
    price?: string;
  }
  
  export interface BookSearchParams {
    query: string;
    maxResults?: number;
    startIndex?: number;
  }
  
  export interface BookRecommendation {
    book: Book;
    matchScore: number;
    reason: string;
  }
  
  export interface BookFilterOptions {
    genre?: string;
    minYear?: number;
    maxYear?: number;
    minRating?: number;
    language?: string;
  }
  

  
  export function isBook(value: unknown): value is Book {
    if (typeof value !== 'object' || value === null) return false;
  
    const book = value as Partial<Book>;
    return (
      typeof book.id === 'string' &&
      typeof book.title === 'string' &&
      typeof book.author === 'string'
    );
  }