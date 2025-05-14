
/**
 * Utility functions for token management
 */

export const tokenUtils = {
  /**
   * Get the token from localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Set token in localStorage
   */
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  /**
   * Remove token from localStorage
   */
  removeToken: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Check if token exists
   */
  hasToken: (): boolean => {
    return !!localStorage.getItem('token');
  }
};
