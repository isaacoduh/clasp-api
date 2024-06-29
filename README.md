# Clasp Finance System Backend

This project is a backend payment system built with Express, TypeScript, and TypeORM. It includes user authentication, KYC processing, fund transfers, and more.

## Project Setup

1. **Initialize Project**
   - Create a directory: `payment_backend`
   - Initialize Node.js:
     ```bash
     npm init -y
     ```
   - Install packages:
     ```bash
     npm install express typescript typeorm pg bcrypt jsonwebtoken express-validator class-validator
     ```
   - Set up TypeScript:
     ```bash
     tsc --init
     ```
   - Configure `tsconfig.json` and `package.json` scripts
   - Set up directories:
     ```
     src/
       ├── controllers/
       ├── routes/
       ├── entities/
       ├── middlewares/
       └── config/
     ```

## Database Configuration

- **TypeORM Setup**
  - Create `src/data-source.ts`
  - Establish database connection
  - Create `User` and `Kyc` entities

## Features

### 1. Authentication

- **User Model**: Custom model using TypeORM
- **Routes**:
  - Registration
  - Login
  - Logout
- **Security**:
  - Password hashing with `bcrypt`
  - JWT token generation with `jsonwebtoken`

### 2. User Registration System

- Validate registration form
- Save user to database
- Return JWT token on successful registration

### 3. User Login System

- Validate login form
- Authenticate user
- Return JWT token on successful login

### 4. User Logout System

- Invalidate JWT token (client-side handling)

### 5. Account Model

- Create `Account` entity
- One-to-one relationship with `User`
- Set up `Account` repository

### 6. KYC Model and Form

- Create `Kyc` entity
- Form validation and processing

### 7. KYC Views

- Routes and controllers for KYC form submission
- Update KYC status and fields

### 8. Transfer Funds

- Handle money transfers between users
- Validate and process transfer requests

### 9. Transaction Views

- View transaction history
- Filter by sender and receiver

### 10. Payment Requests

- Handle payment requests
- Validate and process requests

### 11. Payment Settlements

- Handle payment settlements
- Confirm and process settlements

### 12. Credit Card Management

- Create `CreditCard` entity linked to `User`
- Manage credit cards (add, view, fund, withdraw)

### 13. Alerts and Notifications

- Middleware for alerts and notifications
- Provide user feedback on actions

## Conclusion

This backend system provides a comprehensive set of features for managing user accounts, handling payments, and ensuring secure transactions.
