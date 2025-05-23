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
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    // For non-JSON responses, handle appropriately
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Try to get the response body for debugging
      let responseBody;
      try {
        responseBody = await response.text();
        console.error('Received non-JSON response:', responseBody.substring(0, 200));
      } catch (textError) {
        console.error('Failed to get response text:', textError);
      }
      
      // Show user-friendly error
      toast.error("Cannot connect to API server. Please ensure the backend is running.");
      console.error("Backend server might not be running or returned non-JSON response");
      
      return {
        success: false,
        message: "Server connection issue. Please check if the backend is running.",
        data: {} as T,
      };
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse response as JSON:', jsonError);
      return {
        success: false,
        message: "Failed to parse server response",
        data: {} as T,
      };
    }

    // Handle 401 Unauthorized errors specifically
    if (response.status === 401) {
      toast.error("Authentication required. Please log in.");
      
      // Redirect to login page only if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      
      return {
        success: false,
        message: "Authentication failed",
        data: {} as T,
      };
    }

    if (!response.ok) {
      const errorMsg = data.message || `Error: ${response.status} ${response.statusText}`;
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    return {
      success: true,
      message: data.message || 'Operation successful',
      data: data as T
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    toast.error(message);
    console.error('API Error:', error);
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
    return handleFetch<User>('/auth/login', {
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
  logout: async () => {
    // For frontend-only logout when backend is not available
    return {
      success: true,
      message: 'Logged out successfully',
      data: {} as User
    };
  }
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
