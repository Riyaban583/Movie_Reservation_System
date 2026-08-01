# Movie_Reservation_System
# 🎬 Movie Reservation System

A full-stack Movie Reservation System built using modern web technologies. The application allows users to browse movies, select show timings, reserve seats, and manage bookings, while admins can manage movies, theatres, and shows.

## 🚀 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Validation
- Zod

## ✨ Features

### User
- User Registration & Login
- Secure JWT Authentication
- Browse Movies
- View Show Timings
- Seat Selection
- Book Tickets
- Booking History

### Admin
- Manage Movies
- Manage Theatres & Halls
- Manage Show Timings
- Manage Seat Availability
- View Bookings

## 📁 Project Structure

```
Movie_Reservation/
│
├── client/                 # Next.js Frontend
├── server/                 # Express Backend
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🛠️ Getting Started

### Clone Repository

```bash
git clone https://github.com/Riyaban583/Movie_Reservation_System.git
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
```

Run Prisma Migration:

```bash
npx prisma migrate dev
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 📌 Current Progress

- ✅ Project Setup
- ✅ PostgreSQL Configuration
- ✅ Prisma Integration
- ✅ User Model
- 🔄 Authentication Module (In Progress)

## 📅 Roadmap

- [ ] Project Setup
- [ ] Database Setup
- [ ] Prisma Migration
- [ ] Authentication
- [ ] Role Based Authorization
- [ ] Movie Management
- [ ] Theatre Management
- [ ] Show Management
- [ ] Seat Booking
- [ ] Payment Integration
- [ ] Email Notifications
- [ ] Deployment

## 👩‍💻 Author

**Riya Bansal**




---

⭐ If you like this project, don't forget to star the repository.
