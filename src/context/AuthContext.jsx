import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'authority'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkSession = () => {
      const session = localStorage.getItem('session');
      const type = localStorage.getItem('userType');
      
      if (session) {
        const userData = JSON.parse(session);
        setUser(userData);
        setUserType(type);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkSession();
  }, []);

  // User login
  const userLogin = async (phone, password) => {
    try {
      // In a real implementation, this would use Supabase auth
      // For now, we'll simulate the login process
      const { data, error } = await supabase
        .from('u_register')
        .select('*')
        .eq('phno', phone)
        .eq('pass', password)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setUser(data);
        setUserType('user');
        setIsAuthenticated(true);
        localStorage.setItem('session', JSON.stringify(data));
        localStorage.setItem('userType', 'user');
        return { success: true, data };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // Authority login
  const authorityLogin = async (eid, password) => {
    try {
      const { data, error } = await supabase
        .from('auth_register')
        .select('*')
        .eq('eid', eid)
        .eq('pass', password)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setUser(data);
        setUserType('authority');
        setIsAuthenticated(true);
        localStorage.setItem('session', JSON.stringify(data));
        localStorage.setItem('userType', 'authority');
        return { success: true, data };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // User registration
  const userRegister = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('u_register')
        .insert([userData])
        .select();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  // Authority registration
  const authorityRegister = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('auth_register')
        .insert([userData])
        .select();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('session');
    localStorage.removeItem('userType');
  };

  const value = {
    user,
    userType,
    isAuthenticated,
    loading,
    userLogin,
    authorityLogin,
    userRegister,
    authorityRegister,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}