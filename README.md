<div align="center">

# 🎬 Movie Reservation System

A full-stack, production-oriented **Movie Reservation System** built with **Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, and JWT Authentication**.

Designed with a scalable **MVC architecture** and secure coding practices, this project lets users browse movies, manage bookings, and (soon) reserve seats in real time — with an admin layer for full control over content and shows.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#️-getting-started) • [API Reference](#-api-reference) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

---

## 📖 About the Project

The **Movie Reservation System** is a backend-first application that simulates a real-world ticket booking platform — similar to BookMyShow or Fandango. It's built to demonstrate clean backend architecture, secure authentication, and relational data modeling using modern TypeScript tooling.

The project is under **active development**, with authentication fully implemented and movie/booking modules currently in progress.

---

## ✨ Features

### ✅ Authentication
- User registration & login
- Password hashing with **bcrypt**
- **JWT**-based authentication
- Protected route middleware
- Role-based authorization *(in progress)*

### 🎥 Movies
- Add / update / delete movies *(admin)*
- Fetch all movies
- Fetch single movie details

### 🎟 Booking
- Book movie tickets
- Cancel a booking
- View booking history
- Seat availability check
- Real-time seat locking *(planned)*

### 👤 User
- View & update profile
- Get current logged-in user
- View personal booking history

### 🔐 Security
- Bcrypt password hashing
- JWT token-based auth
- Environment-based secrets
- Route-level protection
- MVC separation of concerns of seats

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | JWT + bcrypt |
| **API Testing** | Postman / Thunder Client |
| **Version Control** | Git & GitHub |

---

## 📂 Project Structure

```
Movie_Reservation/
│
├── client/                    # Frontend (planned)
│
└── server/
    │
    ├── prisma/
    │   ├── migrations/        # Database migrations
    │   └── schema.prisma      # Prisma schema definition
    │
    ├── src/
    │   ├── controllers/       # Request handlers
    │   ├── services/          # Business logic
    │   ├── routes/            # API route definitions
    │   ├── middlewares/       # Auth, error handling, etc.
    │   ├── lib/                # Shared utilities/helpers
    │   ├── validations/       # Request validation schemas
    │   ├── app.ts             # Express app configuration
    │   └── server.ts          # Entry point
    │
    ├── .env                   # Environment variables
    ├── package.json
    └── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL installed and running
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Riyaban583/Movie_Reservation_System.git
```

### 2. Navigate to the server directory
```bash
cd Movie_Reservation/server
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables
Create a `.env` file in the `server/` directory:

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/movie_reservation"

JWT_SECRET="your_secret"
JWT_EXPIRES_IN="7d"

BCRYPT_SALT_ROUNDS=10
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore` and use `.env.example` to share the required keys with collaborators.

### 5. Generate the Prisma Client
```bash
npx prisma generate
```

### 6. Run database migrations
```bash
npx prisma migrate dev
```

### 7. Start the development server
```bash
npm run dev
```

The API will be running at `http://localhost:5000` 🚀

---

## 📡 API Reference

### 🔑 Authentication

<details>
<summary><strong>POST /api/auth/signup</strong> — Register a new user</summary>

**Request Body**
```json
{
  "name": "Riya",
  "email": "riya@gmail.com",
  "password": "123456"
}
```
</details>

<details>
<summary><strong>POST /api/auth/login</strong> — Log in an existing user</summary>

**Request Body**
```json
{
  "email": "riya@gmail.com",
  "password": "123456"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "user": {},
    "token": "JWT_TOKEN"
  }
}
```
</details>

<details>
<summary><strong>GET /api/auth/profile</strong> — Get the current logged-in user</summary>

**Headers**
```
Authorization: Bearer YOUR_JWT_TOKEN
```
</details>

> More endpoints (Movies, Bookings, Users) will be documented here as they are implemented.

---

## 🔒 Authentication Flow

```
 User Login
     │
     ▼
 Check Email Exists
     │
     ▼
 Compare Password (bcrypt)
     │
     ▼
 Generate JWT Token
     │
     ▼
 Return Token to Client
     │
     ▼
 Access Protected Routes
```

---

## 🗄 Database Schema

### User

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier (UUID) |
| `name` | String | Full name of the user |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `role` | String | `USER` or `ADMIN` |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last updated timestamp |

> Additional models (`Movie`, `Booking`, `Theatre`, `Show`, `Seat`) are planned as the project evolves.

---

## 📊 Project Status

| Module | Status |
|---|---|
| Express Setup | ✅ Done |
| PostgreSQL Integration | ✅ Done |
| Prisma ORM | ✅ Done |
| Authentication (JWT + bcrypt) | ✅ Done |
| Protected Routes | ✅ Done |
| Role-Based Access Control | 🚧 In Progress |
| Movies CRUD | 🚧 In Progress |
| Booking System | 🚧 In Progress |
| Seat Locking | 📌 Planned |
| Payment Integration | 📌 Planned |

**Legend:** ✅ Complete &nbsp;|&nbsp; 🚧 In Progress &nbsp;|&nbsp; 📌 Planned

---

## 🗺 Roadmap

- [ ] Role-Based Access Control (RBAC)
- [ ] Admin dashboard APIs
- [ ] Movie CRUD (full)
- [ ] Theatre & show management
- [ ] Seat management & real-time locking
- [ ] Complete booking system
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Ticket download (PDF)
- [ ] Movie poster upload via Cloudinary
- [ ] Frontend client (React)

---

## 🧠 Concepts & Practices Used

`MVC Architecture` · `Express Routing` · `Controllers & Services Pattern` · `Prisma ORM` · `PostgreSQL` · `JWT Authentication` · `bcrypt Hashing` · `Custom Middleware` · `Protected Routes` · `Environment Configuration`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

---

## 👨‍💻 Author

**Riya Bansal**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Riyaban583)

---

<div align="center">

### ⭐ Show your support

If you found this project useful or interesting, consider giving it a **star** on GitHub — it helps a lot!

</div>
