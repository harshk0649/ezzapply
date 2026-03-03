# EzzApply - JobSwipe Platform

EzzApply is a modern job application platform featuring a "swipe-to-apply" interface. It consists of a robust Spring Boot backend and a dynamic React frontend.

## Project Structure

- `backend/`: Spring Boot application handling business logic, user authentication (JWT), and database interactions.
- `frontend/`: React application using Vite, Tailwind CSS, and 3D animations (Three.js/Fiber) for a premium user experience.

---

## Getting Started

### Prerequisites

- **Java JDK 17** or higher
- **Node.js** (v18.0.0 or higher)
- **MySQL Server**
- **Maven** (optional, you can use the provided `mvnw`)

### Step-by-Step Installation & Setup

#### 1. Database Setup
1. Start your MySQL server.
2. Create a database named `ezzapply`:
   ```sql
   CREATE DATABASE ezzapply;
   ```
3. Create a user and grant permissions (as configured in `backend/src/main/resources/application.properties`):
   ```sql
   CREATE USER 'ezzuser'@'localhost' IDENTIFIED BY 'ezzpass123';
   GRANT ALL PRIVILEGES ON ezzapply.* TO 'ezzuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies and build the project:
   ```bash
   ./mvnw clean install
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.

#### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at the URL provided in the terminal (usually `http://localhost:5173`).

---

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security with JWT (jjwt)
- **Database**: MySQL with Spring Data JPA
- **Language**: Java 17
- **Other**: Lombok

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion, React Spring, Three.js (@react-three/fiber)
- **Networking**: Axios
- **Icons**: Lucide React
