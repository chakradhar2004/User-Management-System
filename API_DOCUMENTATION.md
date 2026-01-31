# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security.

### Authentication Headers
```javascript
// For API testing (not required in browser as cookies are sent automatically)
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if applicable)
  ]
}
```

## Authentication Endpoints

### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // Optional: "user" or "admin" (default: "user")
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Errors (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Name must be 2-50 characters",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### POST /auth/login
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- 401: Invalid credentials
- 400: Validation failed

### POST /auth/logout
Logout the current user (clears the HTTP-only cookie).

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /auth/me
Get the current authenticated user's information.

**Headers:** Authentication required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

## User Management Endpoints

### GET /users
Get all users with pagination, search, and sorting. **Admin only.**

**Headers:** Authentication required, Admin role

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10, max: 100)
- `search` (string, optional): Search by name or email
- `sortBy` (string, optional): Field to sort by (default: "createdAt")
- `sortOrder` (string, optional): Sort order "asc" or "desc" (default: "desc")

**Example Request:**
```
GET /users?page=1&limit=10&search=john&sortBy=name&sortOrder=asc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "64a1b2c3d4e5f6789012345",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "isActive": true,
        "lastLogin": "2024-01-15T10:30:00.000Z",
        "createdAt": "2024-01-10T08:00:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 48,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### POST /users
Create a new user. **Admin only.**

**Headers:** Authentication required, Admin role

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user" // Optional: "user" or "admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T11:00:00.000Z",
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

### GET /users/:id
Get a specific user by ID.

**Headers:** Authentication required
- Admin can access any user
- Regular users can only access their own profile

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- 404: User not found
- 403: Access denied (user trying to access another user's profile)

### PUT /users/:id
Update a user. **Admin only for updating other users.**

**Headers:** Authentication required
- Admin can update any user
- Regular users can only update their own profile (use /users/profile instead)

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin", // Admin only
  "isActive": false // Admin only
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Updated",
      "email": "john.updated@example.com",
      "role": "admin",
      "isActive": false,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

### DELETE /users/:id
Delete a user. **Admin only.**

**Headers:** Authentication required, Admin role

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Responses:**
- 404: User not found
- 400: Cannot delete own account

### PUT /users/profile
Update the current user's profile.

**Headers:** Authentication required

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "John Updated",
      "email": "john.updated@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

### PUT /users/change-password
Change the current user's password.

**Headers:** Authentication required

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- 400: Current password is incorrect
- 400: New password must be at least 6 characters

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit exceeded) |
| 500 | Internal Server Error |

## Rate Limiting

- **Global Limit:** 100 requests per 15 minutes per IP
- **Authentication Endpoints:** 5 requests per minute per IP
- **User Management:** 50 requests per minute per authenticated user

## Data Models

### User Model

```json
{
  "_id": "ObjectId",
  "name": "String (2-50 characters, required)",
  "email": "String (unique, required)",
  "password": "String (hashed, min 6 characters, required)",
  "role": "String (enum: 'user', 'admin', default: 'user')",
  "avatar": "String (optional)",
  "isActive": "Boolean (default: true)",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  -c cookies.txt
```

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt
```

**Get All Users (Admin):**
```bash
curl -X GET http://localhost:5000/api/users \
  -b cookies.txt
```

### Using Postman

1. Import the collection (if provided)
2. Set the base URL to `http://localhost:5000/api`
3. For authenticated requests, the cookies will be automatically handled
4. Use the provided sample credentials for testing

## Security Considerations

1. **JWT Tokens:** Stored in HTTP-only cookies, not localStorage
2. **Password Security:** Hashed using bcrypt with salt rounds
3. **Input Validation:** All inputs are validated and sanitized
4. **Rate Limiting:** Implemented to prevent abuse
5. **CORS:** Properly configured for production
6. **Security Headers:** Implemented using Helmet middleware

## WebSocket Support

Currently, this API does not support WebSocket connections. All communication is done via HTTP/HTTPS requests.

## Versioning

The current API version is v1. Future versions will be prefixed with `/v1`, `/v2`, etc.

## Changelog

### v1.0.0
- Initial release
- Authentication endpoints
- User management CRUD operations
- Pagination and search functionality
- Role-based access control
