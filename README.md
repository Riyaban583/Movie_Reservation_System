<div align="center">

# 🎬 Movie Reservation System

**A full-stack, production-oriented movie ticket booking platform**

Built with Next.js, Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, JWT, Redis, BullMQ, and Socket.IO.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](#-license)

[Live Demo](#-live-application) · [Features](#-features) · [Architecture](#%EF%B8%8F-architecture) · [Setup](#%EF%B8%8F-local-setup) · [API Docs](#-api-documentation)

</div>

---

## 📑 Table of Contents

- [Live Application](#-live-application)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Architecture](#%EF%B8%8F-architecture)
- [System Flow Diagram](#-system-flow-diagram)
- [Database Schema (ER Diagram)](#-database-schema-er-diagram)
- [Project Structure](#-project-structure)
- [Local Setup](#%EF%B8%8F-local-setup)
- [Environment Variables](#-environment-variables)
- [Booking Flow](#%EF%B8%8F-booking-flow)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Production Security Verification](#%EF%B8%8F-production-security-verification)
- [Deployment](#-deployment)
- [Project Status](#-project-status)
- [Author](#-author)
- [Project Highlights](#-project-highlights)

---

## 🚀 Live Application

| Resource | Link |
|---|---|
| 🌐 Frontend | [movie-reservation-system-1-w2vm.onrender.com](https://movie-reservation-system-1-w2vm.onrender.com) |
| 🔧 Backend API | [movie-reservation-system-yq1d.onrender.com](https://movie-reservation-system-yq1d.onrender.com) |
| 📘 Swagger API Docs | [movie-reservation-system-yq1d.onrender.com/api-docs](https://movie-reservation-system-yq1d.onrender.com/api-docs) |

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based access control (`USER` / `ADMIN`)
- User profile and booking history

### 🎥 Movies
- Browse movies
- Movie details
- Search and genre filtering
- Date-based filtering
- Pagination
- Admin movie CRUD

### 🏢 Theater, Screen & Seat Management
- Theater management
- Screen management
- Automatic seat generation
- Seat availability by showtime
- Admin controls for theaters, screens, and seats

### 🎟️ Showtime & Reservations
- Date/time-based show scheduling
- Interactive seat selection
- Reservation creation
- Reservation cancellation
- Booking history
- Confirmed booking flow
- QR-based booking confirmation
- Transaction-based seat booking
- Database constraints to prevent double booking / overbooking

### ⚡ Real-Time & Background Processing
- Redis integration
- BullMQ background jobs
- Socket.IO real-time communication
- Email notification workflow
- Queue-based asynchronous processing

### 🛡️ Security
- Helmet security headers
- CORS allowlist for frontend origins
- API rate limiting
- JWT route protection
- bcrypt password hashing
- Environment-based configuration
- Express error handling
- Request validation with Zod

### 📊 Admin Dashboard
- Admin dashboard
- Movie management
- Theater management
- Screen and seat management
- Showtime management
- Revenue analytics

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Node.js, Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| Cache / Data Store | Redis |
| Background Jobs | BullMQ |
| Real-Time | Socket.IO |
| Email | Nodemailer |
| QR Code | QR generation library |
| API Documentation | Swagger / OpenAPI |
| Testing | Jest + Supertest |
| Deployment | Render |
| Version Control | Git + GitHub |

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[Next.js Frontend] -->|REST API| B[Express / Node.js]
    B --> C[Security Middleware<br/>CORS · Helmet · Rate Limit · JWT]
    C --> D[Routes]
    D --> E[Controllers]
    E --> F[Services]
    F --> G[Prisma ORM]
    G --> H[(PostgreSQL)]

    F --> I[(Redis)]
    F --> J[BullMQ Jobs]
    F --> K[Socket.IO]

    I --> L[Email / QR Workflow]
    J --> L
    K --> L

    style A fill:#000,color:#fff
    style H fill:#4169E1,color:#fff
    style I fill:#DC382D,color:#fff
    style K fill:#010101,color:#fff
```

---

## 🔄 System Flow Diagram

```mermaid
sequenceDiagram
    actor U as User
    participant FE as Next.js Frontend
    participant API as Express API
    participant DB as PostgreSQL
    participant R as Redis / BullMQ
    participant WS as Socket.IO

    U->>FE: Browse movies & select showtime
    FE->>API: GET /api/showtimes
    API->>DB: Query seat availability
    DB-->>API: Seat map
    API-->>FE: Available seats

    U->>FE: Select seats & confirm booking
    FE->>API: POST /api/reservations
    API->>DB: Begin transaction (lock seats)
    DB-->>API: Reservation confirmed
    API->>R: Queue email + QR job
    API->>WS: Emit seat-status update
    WS-->>FE: Real-time seat lock broadcast
    R-->>U: Email with QR confirmation
    API-->>FE: Booking success
```

---

## 🗄️ Database Schema (ER Diagram)

```mermaid
erDiagram
    USER ||--o{ RESERVATION : makes
    THEATER ||--o{ SCREEN : contains
    SCREEN ||--o{ SEAT : contains
    SCREEN ||--o{ SHOWTIME : hosts
    MOVIE ||--o{ SHOWTIME : "scheduled as"
    SHOWTIME ||--o{ RESERVATION : "booked for"
    SEAT ||--o{ RESERVATION : "reserved in"

    USER {
        string id PK
        string email
        string password
        string role
    }
    MOVIE {
        string id PK
        string title
        string genre
        int duration
    }
    THEATER {
        string id PK
        string name
        string location
    }
    SCREEN {
        string id PK
        string theaterId FK
        string name
    }
    SEAT {
        string id PK
        string screenId FK
        string seatNumber
    }
    SHOWTIME {
        string id PK
        string movieId FK
        string screenId FK
        datetime startTime
    }
    RESERVATION {
        string id PK
        string userId FK
        string showtimeId FK
        string seatId FK
        string status
    }
```

---

## 📂 Project Structure

```
Movie_Reservation/
│
├── client/                         # Next.js frontend
│   ├── app/                        # Pages / routes / UI
│   ├── components/                 # Reusable UI components
│   └── ...
│
├── server/                         # Express + TypeScript backend
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── validations/
│   │   ├── lib/
│   │   ├── config/
│   │   ├── workers/
│   │   ├── __tests__/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Riyaban583/Movie_Reservation_System.git
cd Movie_Reservation_System
```

### 2. Backend setup
```bash
cd server
npm install
```
Create `server/.env` using the required variables from `server/.env.example`.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run migrations
```bash
npx prisma migrate dev
```

### 5. Start backend
```bash
npm run dev
```

### 6. Frontend setup
From the project root:
```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

> ⚠️ Do not commit real environment values. Use `.env.example` as the template.

Typical backend configuration includes:

```env
PORT=5000
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret"
JWT_EXPIRES_IN="7d"
REDIS_URL="your_redis_url"
CLIENT_URL="http://localhost:3000"
PRODUCTION_CLIENT_URL="your_production_frontend_url"
PRODUCTION_API_URL="your_production_backend_url"
```

---

## 🎟️ Booking Flow

```mermaid
flowchart LR
    A[Select Movie] --> B[Select Date & Showtime]
    B --> C[Fetch Seat Availability]
    C --> D[Select Available Seats]
    D --> E[Reservation Request]
    E --> F[Database Transaction]
    F --> G[Unique Seat / Reservation Constraints]
    G --> H[Reservation Confirmed]
    H --> I[QR Confirmation + Notification]
    I --> J[Visible in My Bookings]
```

The reservation logic uses **database transactions and constraints** so concurrent requests cannot successfully reserve the same seat for the same showtime.

---

## 🧪 Testing

Run all backend tests:
```bash
cd server
npm test -- --runInBand
```

For open-handle diagnostics:
```bash
npm test -- --runInBand --detectOpenHandles
```

Current test suite includes movie and reservation tests, and the final test run completed with both suites passing.

---

## 📡 API Documentation

Swagger / OpenAPI documentation is available at:
👉 **https://movie-reservation-system-yq1d.onrender.com/api-docs**

Main API groups include:

| Endpoint | Description |
|---|---|
| `/api/auth` | Authentication & authorization |
| `/api/movies` | Movie browsing & admin CRUD |
| `/api/theaters` | Theater management |
| `/api/screens` | Screen management |
| `/api/showtimes` | Showtime scheduling |
| `/api/reservations` | Seat reservation & booking |
| `/api/dashboard` | Admin analytics dashboard |

---

## 🛡️ Production Security Verification

The deployed backend has been verified for:

- ✅ Helmet security headers
- ✅ Production CORS allowlist
- ✅ Rejection of unknown CORS origins
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ JWT authentication and role-based access
- ✅ Environment-based secrets

---

## 🚀 Deployment

The production frontend and backend are deployed on **Render**.

Production setup includes:
- Render PostgreSQL
- Render Redis
- Prisma migrations during deployment
- Production CORS configuration
- Environment variables managed through the hosting platform
- Swagger exposed through the deployed API

---

## 📌 Project Status

| Module | Status |
|---|---|
| Backend API | ✅ Complete |
| PostgreSQL + Prisma | ✅ Complete |
| JWT Authentication | ✅ Complete |
| RBAC | ✅ Complete |
| Movie Management | ✅ Complete |
| Theater / Screen / Seat Management | ✅ Complete |
| Showtime Scheduling | ✅ Complete |
| Reservation Engine | ✅ Complete |
| Anti-Overbooking | ✅ Complete |
| Redis | ✅ Complete |
| BullMQ | ✅ Complete |
| Socket.IO | ✅ Complete |
| Email / QR Workflow | ✅ Complete |
| Admin Dashboard / Analytics | ✅ Complete |
| Next.js Frontend | ✅ Complete |
| Swagger / OpenAPI | ✅ Complete |
| Automated Tests | ✅ Complete |
| Production Deployment | ✅ Complete |

---

## 👩‍💻 Author

**Riya Bansal**
GitHub: [@Riyaban583](https://github.com/Riyaban583)

---

## ⭐ Project Highlights

This project demonstrates:
- Modular MVC backend design
- Secure authentication and authorization
- Relational data modeling with Prisma and PostgreSQL
- Transaction-safe reservation handling
- Anti-overbooking design
- Caching and background processing
- Real-time communication
- API documentation and automated testing
- Production deployment and security hardening

---

<div align="center">

Made with ❤️ using Next.js, Node.js, and PostgreSQL

</div>
