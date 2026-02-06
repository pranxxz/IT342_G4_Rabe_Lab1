# User Registration & Authentication

## Project Description
A complete web-based user registration and authentication system built with Spring Boot (backend) and React.js (frontend). The system allows users to create an account, log in using their credentials, access the dashboard, and log out securely. The backend provides RESTful APIs for authentication, while the frontend offers a responsive user interface.

## Technologies Used
- **Backend**: Spring Boot, Spring Data JPA, Spring Web, Spring Security
- **Frontend**: React.js, React Bootstrap, Axios, React Router DOM
- **Database**: MySQL (Managed via phpMyAdmin)
- **Build Tools**: Maven, npm
- **Other**: Java 17, Node.js
- **Authentication**: JWT (JSON Web Tokens)

## Steps to Run Backend
1. Ensure Java 17 is installed.
2. Navigate to the backend directory: `cd backend`
3. Run the application: `./mvnw spring-boot:run` (or `mvnw.cmd spring-boot:run` on Windows)
4. The backend will start on `http://localhost:8080`.

## Steps to Run Web App
1. Ensure Node.js 18+ is installed.
2. Navigate to the web app directory: `cd web/mini-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. The web app will run on `http://localhost:3000`.

## Steps to Run Mobile App
The mobile app is not implemented yet. Planned for future development.

## List of API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return token
- `GET /api/dashboard` - Access protected dashboard (requires authentication)
