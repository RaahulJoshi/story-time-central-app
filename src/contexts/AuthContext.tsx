
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { userService, authService } from '@/services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for session validity on mount
  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      
      try {
        // Validate by fetching user data
        const response = await userService.getCurrentUser();
        
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        setUser(null);
      }
      
      setIsLoading(false);
    };
    
    validateSession();
  }, []);

  const login = (user: User) => {
    setUser(user);
    toast.success("Successfully logged in");
  };

  const logout = async () => {
    try {
      // Try to call logout API if backend is available
      await authService.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local user state
      setUser(null);
      toast.info("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
