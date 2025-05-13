
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'LIBRARIAN' | 'ADMIN';
  firstName?: string;
  lastName?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published: string;
  genre: string;
  description: string;
  coverImage: string;
  available: number;
}

export interface Loan {
  id: number;
  userId: number;
  bookId: number;
  book: Book;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
