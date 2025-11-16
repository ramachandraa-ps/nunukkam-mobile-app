import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signIn: (userData: { email: string; name: string }) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialAuth?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialAuth = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate checking for stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // In a real app, check AsyncStorage for stored auth token
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const userData: User = { 
        id: 'student-1', 
        email, 
        name: email.split('@')[0] 
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      console.log('✅ Login successful:', userData);
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    console.log('🚪 Logging out...');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const signIn = useCallback((userData: { email: string; name: string }) => {
    console.log('✅ SignIn called with:', userData);
    const user: User = { id: 'student-1', ...userData };
    setUser(user);
    setIsAuthenticated(true);
    console.log('✅ Authentication state updated: isAuthenticated = true');
  }, []);

  const signOut = useCallback(() => {
    console.log('🚪 Signing out...');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
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
