# 📄 CV Maker App

A professional CV generator built with **React**, **Rust**, and **PostgreSQL**.  
This app allows users to input their personal and career details through a simple form, upload a profile image, and automatically generate a polished CV in PDF format.

---

## 🚀 Core Functionality

- **Form-based Input**  
  Users fill out a multi-step form with personal details, education, work experience, skills, and upload a profile image.

- **Automated CV Generation**  
  The backend processes the data and generates a professional CV using predefined templates.

- **Image Upload & Integration**  
  Profile images are uploaded and embedded directly into the CV.

- **Database Storage**  
  All user details are stored securely in PostgreSQL for future edits or multiple CV generations.

- **Downloadable PDF**  
  Users can preview and download their CV in PDF format.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (form handling, validation, CV preview)
- **Backend**: Rust (Actix-Web or Rocket for API, PDF generation logic)
- **Database**: PostgreSQL (stores user details, education, experience, skills, and CV metadata)
- **Storage**: Local or cloud (e.g., AWS S3) for profile images and generated CVs

---

## 🔑 Core Features

- **Multi-step Form Wizard**  
  Step-by-step input for personal info, education, work experience, and skills.

- **Template System**  
  Multiple CV templates available; users can choose their preferred style.

- **Real-time Preview**  
  See how the CV looks before finalizing.

- **PDF Export**  
  Generate and download a professional CV instantly.

- **Secure Data Handling**  
  User data stored in PostgreSQL with proper validation and sanitization.

- **Responsive UI**  
  Mobile-friendly design using Material-UI or TailwindCSS.

---

## 📂 Project Structure

cv-maker-app/ │ ├── frontend/ (React) │ ├── src/components/ │ │ ├── FormPage.jsx │ │ ├── PreviewPage.jsx │ │ └── DownloadPage.jsx │ └── src/context/ │ ├── backend/ (Rust) │ ├── src/ │ │ ├── models.rs │ │ ├── routes.rs │ │ ├── db.rs │ │ └── cv_generator.rs │ ├── database/ (PostgreSQL) │ └── schema.sql │ └── README.md

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    profile_image_url TEXT
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    institution VARCHAR(150),
    degree VARCHAR(100),
    start_date DATE,
    end_date DATE
);

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    company VARCHAR(150),
    role VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    skill VARCHAR(100)
);


```
