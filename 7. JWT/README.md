# Full-Stack Authentication - `://AuthN`

## Key Features
1. **User Registration and Login** (including Google OAuth 2.0)
2. **Adaptive Authentication**
3. **Remember Me Functionality**
4. **Password Management** (Change, Reset)
5. **Email Verification**
6. **User Profile Management**
7. **Role-Based Access Control** (RBAC)
8. **Automated Email Notifications**
9. **Device/Browser Recognition**  
   - When a new login occurs from an unrecognized device, an access code is sent to the user's email.
10. **Email Alerts**  
    - Notifications sent when users change their password, reset forgotten passwords, verify their email, log in from a new device, or when an admin changes a user's role.

## Technical Stack

### Frontend:
- **React.js** for UI
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API requests
- **React Hot Toast** for notifications

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for data modeling
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password hashing
- **Cryptr** for sensitive data encryption
- **Google OAuth 2.0** for third-party authentication
- **Nodemailer** with **Google OAuth2.0 + Gmail** for email services
- **Cloudinary** for storing user profile images

## Security Measures:
- Password hashing with **bcryptjs**
- **JWT** for secure authentication
- **HTTP-only cookies** for session management
- **CSRF protection** using the `sameSite` cookie attribute
- Input validation for all forms and API requests
- Rate limiting for API endpoints
- **Google OAuth 2.0** for secure third-party authentication

## User Flow:
1. Users register with an email and password, or via Google OAuth.
2. An email verification is sent to new users.
3. Users can log in with email/password or via Google OAuth.
4. Logging in from new devices/browsers requires an access code sent to the user's email.
5. Users can request password resets via email.
6. User sessions are managed via **JWT** stored in HTTP-only cookies.
7. Users can update their profile information, including changing passwords.
8. Admins can manage user roles and access user data.

## Code Structure:
- **Frontend**: Modular React components, state management using **Redux Toolkit**.
- **Backend**: Express.js-based REST API with separate functions for each major operation.
- **Utilities**: Common utility functions for token generation, error handling, etc.
- **Database**: MongoDB with **Mongoose** for data modeling.
- **Middleware**: Authentication and authorization middleware for protecting routes.

## Deployment:
- **Frontend**: Deployed on **Vercel**
- **Backend**: Deployed on **Render**

## Summary:
This full-stack authentication application provides a robust foundation for user authentication and management, designed for integration into larger web applications or as a standalone auth service. It leverages modern web technologies and best practices for both frontend and backend development, ensuring a secure and scalable user management system.