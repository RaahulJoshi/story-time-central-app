
import { ApiResponse, Book, Loan, LoginCredentials, RegisterData, User } from '@/types';
import { toast } from 'sonner';

// Use relative URL for API requests
const API_URL = '/api';

// Helper to handle fetch requests
const handleFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    toast.error(message);
    return {
      success: false,
      message,
      data: {} as T,
    };
  }
};

// Auth Services
export const authService = {
  login: async (credentials: LoginCredentials) => {
    return handleFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  register: async (data: RegisterData) => {
    return handleFetch<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Book Services
export const bookService = {
  getAllBooks: async () => {
    return handleFetch<Book[]>('/books');
  },
  getBookById: async (id: number) => {
    return handleFetch<Book>(`/books/${id}`);
  },
  searchBooks: async (query: string) => {
    return handleFetch<Book[]>(`/books/search?query=${encodeURIComponent(query)}`);
  },
};

// Loan Services
export const loanService = {
  getUserLoans: async () => {
    return handleFetch<Loan[]>('/loans/user');
  },
  borrowBook: async (bookId: number) => {
    return handleFetch<Loan>('/loans', {
      method: 'POST',
      body: JSON.stringify({ bookId }),
    });
  },
  returnBook: async (loanId: number) => {
    return handleFetch<Loan>(`/loans/${loanId}/return`, {
      method: 'POST',
    });
  },
};

// User Services
export const userService = {
  getCurrentUser: async () => {
    return handleFetch<User>('/users/me');
  },
  updateProfile: async (data: Partial<User>) => {
    return handleFetch<User>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
