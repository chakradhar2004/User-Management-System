import api from './api'

export const userService = {
  // Get all users with pagination and search (Admin only)
  async getUsers(params = {}) {
    try {
      const response = await api.get('/users', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // Create new user (Admin only)
  async createUser(userData) {
    try {
      const response = await api.post('/users', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // Update user
  async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // Delete user (Admin only)
  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // Update current user's profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/users/profile', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put('/users/change-password', passwordData)
      return response
    } catch (error) {
      throw error
    }
  },
}
