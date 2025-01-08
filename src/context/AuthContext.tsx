import React, { createContext, useState, useEffect, useContext,ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false); // Track initialization

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('authToken');

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setInitialized(true); // Mark as initialized
  }, []);

  if (!initialized) {
    return <div>Loading...</div>; // Prevent rendering until initialized
  }

  const login = (id: string, token: string) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('authToken', token);
    setUserId(id);
    setIsAuthenticated(true);
    console.log('Logged in:', { id, token }); // Debug log for login
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
