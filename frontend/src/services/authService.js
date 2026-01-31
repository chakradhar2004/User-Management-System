import api from './api'

export const authService = {
  // Register new user
  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      return response
    } catch (error) {
      throw error
    }
  },

  // Logout user
  async logout() {
    try {
      const response = await api.post('/auth/logout')
      return response
    } catch (error) {
      throw error
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me')
      return response
    } catch (error) {
      throw error
    }
  },
}
