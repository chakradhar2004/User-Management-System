import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

// Use your production MongoDB URI
const MONGODB_URI = 'mongodb+srv://kakkuluruchakradhargoud_db_user:VbYzGtmoMESDWqwx@cluster0.mpv48xf.mongodb.net/user-management?retryWrites=true&w=majority';

const createProductionAdmin = async () => {
  try {
    // Connect to production MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to production MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists in production');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Production admin user created successfully');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error creating production admin:', error);
    process.exit(1);
  }
};

createProductionAdmin();
