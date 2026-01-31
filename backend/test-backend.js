// Test script to check backend connectivity
import axios from 'axios';

const testBackend = async () => {
  try {
    console.log('🔍 Testing backend health endpoint...');
    const response = await axios.get('https://user-management-system-ldg4.onrender.com/health');
    console.log('✅ Backend is running:', response.data);
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

testBackend();
