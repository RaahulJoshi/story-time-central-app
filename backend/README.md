
# LibraryHub - Backend

This directory contains the Spring Boot backend for the LibraryHub application.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── libraryhub/
│   │   │           ├── LibraryHubApplication.java
│   │   │           ├── config/
│   │   │           │   └── SecurityConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── BookController.java
│   │   │           │   ├── LoanController.java
│   │   │           │   └── UserController.java
│   │   │           ├── dto/
│   │   │           │   ├── AuthRequest.java
│   │   │           │   ├── AuthResponse.java
│   │   │           │   ├── BookDto.java
│   │   │           │   ├── LoanDto.java
│   │   │           │   ├── RegisterRequest.java
│   │   │           │   └── UserDto.java
│   │   │           ├── exception/
│   │   │           │   ├── ApiException.java
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   └── ResourceNotFoundException.java
│   │   │           ├── model/
│   │   │           │   ├── Book.java
│   │   │           │   ├── Loan.java
│   │   │           │   ├── Role.java
│   │   │           │   └── User.java
│   │   │           ├── repository/
│   │   │           │   ├── BookRepository.java
│   │   │           │   ├── LoanRepository.java
│   │   │           │   └── UserRepository.java
│   │   │           ├── security/
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   ├── JwtTokenProvider.java
│   │   │           │   └── UserDetailsServiceImpl.java
│   │   │           └── service/
│   │   │               ├── AuthService.java
│   │   │               ├── BookService.java
│   │   │               ├── LoanService.java
│   │   │               └── UserService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/
│           └── com/
│               └── libraryhub/
│                   └── ... (test classes)
└── pom.xml
```

## Database Schema

```
+----------------+     +----------------+     +----------------+
|     Users      |     |     Books      |     |     Loans      |
+----------------+     +----------------+     +----------------+
| id             |     | id             |     | id             |
| username       |     | title          |     | user_id        |
| password       |     | author         |     | book_id        |
| email          |     | isbn           |     | borrow_date    |
| first_name     |     | published      |     | due_date       |
| last_name      |     | genre          |     | return_date    |
| role           |     | description    |     | status         |
+----------------+     | cover_image    |     +----------------+
                       | available      |
                       +----------------+
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/search?query={query}` - Search books
- `POST /api/books` - Add a new book (librarian/admin only)
- `PUT /api/books/{id}` - Update a book (librarian/admin only)
- `DELETE /api/books/{id}` - Delete a book (admin only)

### Loans
- `GET /api/loans/user` - Get current user's loans
- `POST /api/loans` - Borrow a book
- `POST /api/loans/{id}/return` - Return a book
- `GET /api/loans` - Get all loans (librarian/admin only)

### Users
- `GET /api/users/me` - Get current user details
- `PUT /api/users/me` - Update current user details
- `GET /api/users` - Get all users (admin only)

## Build and Run

```bash
cd backend
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`.
