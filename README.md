# User Management System (MERN Stack)

A production-ready, full-stack User Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). This application demonstrates modern web development best practices including JWT authentication, role-based access control, responsive design, and comprehensive CRUD operations.

## 🚀 Features

### Authentication & Authorization
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Secure password hashing with bcrypt
- ✅ Role-based access control (Admin/User)
- ✅ Auto-login on page refresh
- ✅ Protected routes and API endpoints

### User Management
- ✅ Full CRUD operations for users
- ✅ Admin dashboard with user management
- ✅ User profile management
- ✅ Password change functionality
- ✅ Account activation/deactivation

### Advanced Features
- ✅ Pagination with customizable page sizes
- ✅ Real-time search functionality
- ✅ Sorting capabilities
- ✅ Responsive design (mobile-first)
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Form validation

### Security & Performance
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Optimized MongoDB queries
- ✅ Environment variable configuration

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (for production)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see .env.example)
# Update MONGODB_URI with your MongoDB Atlas connection string
# Set a secure JWT_SECRET
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 4. Run the Application

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
user-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── userController.js    # User management logic
│   │   ├── middleware/
│   │   │   ├── auth.js              # Authentication middleware
│   │   │   └── errorHandler.js     # Error handling
│   │   ├── models/
│   │   │   └── User.js              # User schema
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   └── users.js             # User management routes
│   │   ├── utils/
│   │   │   └── jwtUtils.js          # JWT utilities
│   │   └── server.js                # Express server
│   ├── .env.example                 # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx           # Main layout component
│   │   │   ├── PrivateRoute.jsx     # Route protection
│   │   │   └── AdminRoute.jsx       # Admin-only routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   │   ├── Profile.jsx          # Profile management
│   │   │   └── NotFound.jsx         # 404 page
│   │   ├── services/
│   │   │   ├── api.js               # Axios configuration
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── userService.js       # User API calls
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users` | Get all users (with pagination) | Yes | Admin |
| POST | `/api/users` | Create new user | Yes | Admin |
| GET | `/api/users/:id` | Get user by ID | Yes | Admin/User* |
| PUT | `/api/users/:id` | Update user | Yes | Admin/User* |
| DELETE | `/api/users/:id` | Delete user | Yes | Admin |
| PUT | `/api/users/profile` | Update own profile | Yes | User |
| PUT | `/api/users/change-password` | Change password | Yes | User |

*Users can only access their own profile

### Query Parameters

For `/api/users` endpoint:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search by name or email
- `sortBy` (string): Field to sort by (default: createdAt)
- `sortOrder` (string): Sort order 'asc' or 'desc' (default: desc)

## 🎯 Sample Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** Admin

### Regular User
- **Email:** user@example.com
- **Password:** user123
- **Role:** User

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Prepare for Production**
```bash
# Build for production
cd backend
npm install --production
```

2. **Environment Variables**
Set the following environment variables on your hosting platform:
- `NODE_ENV=production`
- `MONGODB_URI` (your MongoDB Atlas connection string)
- `JWT_SECRET` (a secure random string)
- `FRONTEND_URL` (your deployed frontend URL)

3. **Deploy**
- Push your code to GitHub
- Connect your repository to Render/Railway
- Configure build command: `npm install`
- Configure start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. **Build for Production**
```bash
cd frontend
npm run build
```

2. **Environment Variables**
Set the API URL in your hosting platform:
- `VITE_API_URL` (your deployed backend URL)

3. **Deploy**
- Push your code to GitHub
- Connect your repository to Vercel/Netlify
- Configure build command: `npm run build`
- Configure output directory: `dist`

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use strong, randomly generated secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use MongoDB Atlas with IP whitelisting
   - Enable authentication and encryption
   - Regular backups

3. **API Security**
   - Rate limiting implemented
   - Input validation on all endpoints
   - CORS properly configured
   - Security headers with Helmet

4. **Authentication**
   - HTTP-only cookies for JWT tokens
   - Secure password hashing with bcrypt
   - Token expiration handling

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help, please:
1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information

## 🎉 Acknowledgments

- React team for the amazing framework
- MongoDB for the excellent database
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors who made this project possible
