import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('gymUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('gymUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate login with mock data
      const mockUsers = {
        admin: {
          id: 1,
          username: 'admin',
          email: 'admin@gym.com',
          role: 'admin',
          name: 'Admin User',
          avatar: '👨‍💼'
        },
        staff: {
          id: 2,
          username: 'staff',
          email: 'staff@gym.com',
          role: 'staff',
          name: 'Staff User',
          avatar: '👩‍💼'
        },
        member: {
          id: 3,
          username: 'member',
          email: 'member@gym.com',
          role: 'member',
          name: 'Member User',
          avatar: '🏃‍♂️'
        }
      };

      const user = mockUsers[credentials.username];
      if (user && credentials.password === 'password') {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('gymUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gymUser');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('gymUser', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
