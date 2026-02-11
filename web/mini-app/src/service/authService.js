import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Store logout logic separately to avoid circular dependency
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
  window.location.href = '/login';
};

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't auto-logout for login/register errors
    const url = error.config?.url || '';
    
    // Check if this is an auth endpoint
    const isAuthEndpoint = url.includes('/login') || 
                          url.includes('/register') || 
                          url.includes('/api/auth/login') || 
                          url.includes('/api/auth/register');
    
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    // For other endpoints, logout on 401
    if (error.response && error.response.status === 401) {
      handleLogout(); // Use the separate function instead of authService.logout()
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Check if email exists
  checkEmail: async (email) => {
    try {
      const response = await api.get(`/check-email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  },
  
  // Check if username exists
  checkUsername: async (username) => {
    try {
      const response = await api.get(`/check-username/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },
  
  // Register new user - IMPROVED VERSION
  register: async (userData) => {
    try {
      console.log('📝 Register attempt with:', userData.email);
      
      const response = await api.post('/register', userData);
      
      console.log('✅ Registration successful:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        }));
      }
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        requestData: userData
      });
      
      // Re-throw the error with more context
      const customError = new Error(error.response?.data?.message || 'Registration failed');
      customError.status = error.response?.status;
      customError.responseData = error.response?.data;
      throw customError;
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      console.log('🔐 Login attempt with:', credentials.email);
      
      const response = await api.post('/login', credentials);
      
      console.log('✅ Login successful:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        }));
      }
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      // Only call backend if we have a token
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout(); // Use the same function as interceptor
    }
  },
  
  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
  },
  
  // Validate token with backend
  validateToken: async () => {
    try {
      const response = await api.get('/validate-token');
      if (response.data.token) {
        // Update stored user info if needed
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        }));
      }
      return response.data;
    } catch (error) {
      console.error('Token validation error:', error);
      // Token is invalid, logout user
      handleLogout();
      throw error;
    }
  },
  
  // Refresh token (if you implement this endpoint)
  refreshToken: async () => {
    try {
      const response = await api.post('/refresh-token');
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
  
  // Get auth header (for manual use if needed)
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export default authService;