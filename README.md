# 🚀 Web Programmer Challenge - Authentication System






<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?logo=vite)

**Modern Full-Stack Authentication System**  
*Built for PT. Javis Teknologi Albarokah Web Programmer Challenge*

[Demo](#-live-demo) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture)

</div>

## 📋 Project Overview

A complete authentication system with modern UI/UX, built as a technical challenge for **PT. Javis Teknologi Albarokah**. Features secure JWT-based authentication, responsive design, and production-ready architecture.

### 🎯 Challenge Requirements Met

| Requirement | Status | Features Implemented |
|-------------|---------|---------------------|
| **Login Form** | ✅ | Email/Username + Password |
| **Form Validation** | ✅ | Real-time validation & error messages |
| **Error Handling** | ✅ | User-friendly error messages |
| **Protected Routes** | ✅ | JWT-based route protection |
| **Show/Hide Password** | ✅ | Toggle password visibility |
| **Responsive Design** | ✅ | Mobile & desktop optimized |
| **Professional UI** | ✅ | Modern design with TailwindCSS |
| **Dark/Light Mode** | ✅ | Theme toggle with persistence |

### 🚀 Bonus Features Implemented

- ✅ **Rate Limiting** - 5 attempts per minute with countdown timer
- ✅ **Password Strength Meter** - Visual password validation
- ✅ **Loading Animations** - Smooth UX during operations
- ✅ **Particle Background** - Animated login background
- ✅ **Remember Me** - Session persistence option
- ✅ **Security Features** - HttpOnly cookies, bcrypt hashing

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Validator** - Input validation

### Database
- **MySQL** - Relational database
- **Automatic Schema** - Self-initializing tables

## 🏗 System Architecture

```mermaid
graph TB
    A[User Browser] --> B[React Frontend]
    B --> C[Vite Dev Server]
    B --> D[Express Backend API]
    D --> E[MySQL Database]
    D --> F[JWT Authentication]
    D --> G[Rate Limiting]
    
    subgraph Frontend Layer
        C
        H[React Components]
        I[Context API]
        J[React Router]
    end
    
    subgraph Backend Layer
        D
        K[Auth Routes]
        L[Middleware]
        M[Security]
    end
    
    H --> I
    I --> J
    K --> L
    L --> M