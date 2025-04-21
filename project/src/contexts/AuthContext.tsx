import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Store users in localStorage
const USERS_STORAGE_KEY = 'bonrecords_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Initialize users if not exists
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      const initialUsers = [
        {
          id: 1,
          username: 'admin',
          password: 'admin123',
          role: 'admin'
        }
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }
  }, []);

  const register = async (username: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    // Check if username already exists
    if (users.some((u: any) => u.username === username)) {
      return false;
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      role: 'client'
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto login after registration
    const userInfo = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    };
    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      const userInfo = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role
      };
      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};