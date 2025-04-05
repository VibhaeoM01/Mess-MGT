import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to verify credentials
      // For demo purposes, we'll use mock data
      const mockUsers = {
        // Admin users
        'admin@example.com': { id: '1', role: 'admin', name: 'Admin User' },
        'messadmin@example.com': { id: '2', role: 'admin', name: 'Mess Admin' },
        
        // Student users
        'student@example.com': { id: '3', role: 'student', name: 'Student User' },
        'student1@example.com': { id: '4', role: 'student', name: 'John Doe' },
        'student2@example.com': { id: '5', role: 'student', name: 'Jane Smith' },
        'student3@example.com': { id: '6', role: 'student', name: 'Alex Johnson' },
        
        // Staff users
        'staff@example.com': { id: '7', role: 'staff', name: 'Staff User' },
        'chef@example.com': { id: '8', role: 'staff', name: 'Head Chef' },
        'manager@example.com': { id: '9', role: 'staff', name: 'Mess Manager' }
      };

      if (mockUsers[email] && password === 'password123') {
        setUser(mockUsers[email]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';
  const isStudent = () => user?.role === 'student';
  const isStaff = () => user?.role === 'staff';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isStudent,
      isStaff
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 