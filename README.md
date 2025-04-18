# Medical Records Management System

A full-stack web application for managing medical records with separate interfaces for doctors and patients.

## Features

- User authentication (login/register) for both doctors and patients
- Secure storage of medical records
- Role-based access control
- Doctor can view and manage patient records
- Patients can view their own medical records
- File upload support for medical documents
- Modern and responsive UI using Material-UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads

### Frontend
- React
- Material-UI
- React Router
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-records-system
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/medical-records
JWT_SECRET=your-secret-key
PORT=5000
```

5. Start the backend server:
```bash
npm start
```

6. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

1. Register as a doctor or patient
2. Login with your credentials
3. Doctors can:
   - View all patient records
   - Add new medical records
   - Update existing records
   - Delete records
4. Patients can:
   - View their own medical records
   - See their personal information
   - View visit history

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Secure file upload handling
- Input validation
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 