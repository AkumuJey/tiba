# Tiba Project

## Project Overview

This project consists of a frontend and a backend for the Tiba application. The scripts provided in the `package.json` file facilitate running both parts of the application.

## Installation

Use the following command to install all dependencies in both the frontend and backend directories:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install

# starting app from common root directory
npm start-frontend
npm start-backend

# Return to the root directory
cd ..
```

# add patient with post man

```
url: "http://localhost:3000/patient/signup"
patient data
{
  "firstName": "John",
  "lastName": "Doe",
  "sex": "Male",
  "email": "john.doe@gamil.com",
  "password": "securePass123",
  "dateOfBirth": "1990-01-15T00:00:00.000Z",
  "phoneNumber": "1234567890",
  "address": "123 Main St, Anytown, USA",
  "emergencyContactName": "Jane Doe",
  "emergencyContactNumber": "0987654321"
}
```
