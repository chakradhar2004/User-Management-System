import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for HTTP-only cookies
})

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Token is automatically sent via HTTP-only cookies
    // No need to manually add Authorization header
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      // Handle authentication errors
      if (status === 401) {
        // Clear any stored auth state
        localStorage.removeItem('user')
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      
      // Return error message from server or default message
      return Promise.reject({
        message: data?.message || 'An error occurred',
        status,
        data: data || null
      })
    } else if (error.request) {
      // Network error
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0
      })
    } else {
      // Other error
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0
      })
    }
  }
)

export default api
