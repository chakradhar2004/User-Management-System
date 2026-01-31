// Test production backend and create admin user
import axios from 'axios';

const API_URL = 'https://user-management-system-ldg4.onrender.com/api';

const testBackend = async () => {
  try {
    console.log('🔍 Testing backend health...');
    
    // Test health endpoint
    const healthResponse = await axios.get('https://user-management-system-ldg4.onrender.com/health');
    console.log('✅ Backend Health:', healthResponse.data);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };
    
    const signupResponse = await axios.post(`${API_URL}/auth/signup`, adminData);
    console.log('✅ Admin user created:', signupResponse.data);
    
    // Login with admin
    console.log('🔐 Testing admin login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('✅ Admin login successful:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

testBackend();
