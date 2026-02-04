# User Registration & Authentication

## Project Description
A complete web-based user registration and authentication system built with Spring Boot (backend) and React.js (frontend). The system allows users to create an account, log in using their credentials, access the dashboard, and log out securely. The backend provides RESTful APIs for authentication, while the frontend offers a responsive user interface.

## Technologies Used
- **Backend**: Spring Boot, Spring Data JPA, Spring Web, MySQL
- **Frontend**: React.js, React Bootstrap, Axios
- **Database**: MySQL
- **Build Tools**: Maven, npm
- **Other**: Java 17, Node.js

## Steps to Run Backend
1. Ensure Java 11 is installed.
2. Navigate to the backend directory: `cd backend/mini-app`
3. Update `pom.xml` to use Spring Boot 2.7.18 (change version from 4.0.2).
4. Run the application: `mvnw.cmd spring-boot:run`
5. The backend will start on `http://localhost:8080`.

## Steps to Run Web App
1. Ensure Node.js is installed.
2. Navigate to the web app directory: `cd web/mini-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. The web app will run on `http://localhost:3000`.

## Steps to Run Mobile App
The mobile app is not implemented yet. Planned for future development using React Native.

## List of API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return token
- `GET /api/dashboard` - Access protected dashboard (requires authentication)
