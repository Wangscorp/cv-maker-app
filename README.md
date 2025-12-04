# CV Maker

[![GitHub repo](https://img.shields.io/badge/github-cv--maker--app-blue?logo=github)](https://github.com/Wangscorp/cv-maker-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=flat&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)

A full-stack web application for creating professional CVs/resumes. Built with React (frontend) and Rust/Actix (backend).

## 🚀 Features

- **User Authentication** - Secure signup, login, and password reset functionality
- **CV Generation** - Create professional CVs with personal information, education, work experience, and skills
- **PDF Export** - Generate and download CVs as PDF files
- **Modern UI** - Beautiful, responsive design with Material-UI components
- **RESTful API** - Clean backend API built with Actix-web

## 🏗️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - Component library for professional UI
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend

- **Rust** - Systems programming language
- **Actix-web** - Fast and powerful web framework
- **Diesel** - ORM and query builder for PostgreSQL
- **PostgreSQL** - Relational database
- **printpdf** - PDF generation library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and npm
- **Rust** (latest stable version)
- **PostgreSQL** (v14 or higher)
- **Cargo** (comes with Rust)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Wangscorp/cv-maker-app.git
cd cv-maker-app
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb cvmaker

# Run the schema
psql cvmaker < database/schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install libpq-dev postgresql-client

# Create .env file
cat > .env << EOF
DATABASE_URL=postgres://username:password@localhost/cvmaker
EOF

# Build and run
cargo build
cargo run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🚦 Running the Application

1. **Start the backend:**

   ```bash
   cd backend
   cargo run
   ```

2. **Start the frontend (in a new terminal):**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## 📁 Project Structure

```
CVMaker/
├── backend/               # Rust backend
│   ├── src/
│   │   ├── main.rs       # Application entry point
│   │   ├── routes.rs     # API route handlers
│   │   ├── models.rs     # Database models
│   │   ├── db.rs         # Database connection
│   │   └── cv_generator.rs  # PDF generation logic
│   ├── Cargo.toml        # Rust dependencies
│   └── .env              # Environment variables
├── frontend/             # React frontend
│   ├── src/
│   │   ├── App.jsx       # Main application component
│   │   ├── components/   # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── App.css       # Main styles
│   │   └── index.css     # Global styles
│   ├── package.json      # Node dependencies
│   └── vite.config.js    # Vite configuration
├── database/
│   └── schema.sql        # Database schema
└── README.md             # This file
```

## 🔧 Configuration

### Backend Configuration (.env)

```env
DATABASE_URL=postgres://username:password@localhost/cvmaker
RUST_LOG=info
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8080`. To change this, update the API URLs in the frontend components.

## 🎨 Features Overview

### Authentication

- User registration with email validation
- Secure login system
- Password reset functionality

### CV Creation

- Personal information section
- Education history
- Work experience
- Skills listing
- PDF export with professional formatting

## 🛡️ API Endpoints

### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Request password reset

### CV Management

- `POST /create-cv` - Generate new CV
- `GET /cv/:id` - Retrieve CV details

## 🚀 Building for Production

### Backend

```bash
cd backend
cargo build --release
./target/release/backend
```

### Frontend

```bash
cd frontend
npm run build
# Serve the dist/ folder with your preferred web server
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👥 Authors

- Wangscorp - Initial work

## 🐛 Known Issues

- Authentication endpoints use placeholder implementation (TODO: implement proper auth with password hashing and JWT)
- PDF generation needs additional styling options
- Database schema needs proper user authentication table

## 📮 Support

For support, open an issue in the [GitHub repository](https://github.com/Wangscorp/cv-maker-app/issues).

## 🙏 Acknowledgments

- Material-UI for the component library
- Actix-web team for the excellent Rust web framework
- All contributors who help improve this project
