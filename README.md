# Project 3 — Database Integration

> **DecodeLabs Industrial Training Kit | Full Stack Development | Batch 2026**

---

## Overview

This project represents the **persistence phase** of the DecodeLabs Full Stack Development program.
The objective is to connect a Node.js/Express backend to a PostgreSQL database using Prisma ORM,
design a relational schema, and implement complete **CRUD (Create, Read, Update, Delete)** operations
through a professional RESTful API.

This milestone proves the ability to bridge the gap between application logic and permanent
data storage — moving beyond temporary variables into true **Data Longevity**.

---

## The 4 Pillars of This Project

| Pillar | Name | What Was Built |
|--------|------|----------------|
| Pillar 1 | **The Blueprint** | Relational schema with User & Post models |
| Pillar 2 | **The Bridge** | Prisma ORM connected to PostgreSQL |
| Pillar 3 | **The Action** | Full CRUD mapped to RESTful HTTP methods |
| Pillar 4 | **The Shield** | Input validation, constraints & SQL injection prevention |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | v18+ |
| Framework | Express.js | ^5.2.1 |
| Database | PostgreSQL | Latest |
| ORM | Prisma | ^5.22.0 |
| Validation | express-validator | ^7.3.2 |
| Environment | dotenv | ^17.4.2 |
| Dev Server | Nodemon | ^3.1.14 |

---

## Project Structure

```
project3-database/
│
├── prisma/
│   ├── schema.prisma           # Database schema — User & Post models
│   └── migrations/             # Auto-generated migration history
│
├── src/
│   ├── controllers/
│   │   ├── userController.js   # CRUD logic for User model
│   │   └── postController.js   # CRUD logic for Post model
│   │
│   ├── routes/
│   │   ├── userRoutes.js       # User API routes with input validation
│   │   └── postRoutes.js       # Post API routes with input validation
│   │
│   └── db/
│       └── prismaClient.js     # Prisma Client singleton instance
│
├── server.js                   # Application entry point
├── package.json                # Project dependencies
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Git ignored files
└── README.md                   # Project documentation
```

---

## Database Schema

Two models connected through a **One-to-Many (1:Many)** relationship:

```
User (1) ──────────────────── (Many) Post
```

One user can own many posts. Each post belongs to exactly one user
through a **Foreign Key** reference.

### User Model

| Field | Type | Constraint |
|-------|------|-----------|
| id | Int | Primary Key · Auto-increment |
| name | String | NOT NULL |
| email | String | UNIQUE · NOT NULL |
| createdAt | DateTime | Auto-generated |
| posts | Post[] | One-to-Many relation |

### Post Model

| Field | Type | Constraint |
|-------|------|-----------|
| id | Int | Primary Key · Auto-increment |
| title | String | NOT NULL · Max 100 chars |
| content | String | NOT NULL |
| userId | Int | Foreign Key → User.id |
| createdAt | DateTime | Auto-generated |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** installed and running locally
- **Git** installed

### Installation & Setup

**Step 1 — Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/project3-database.git
cd project3-database
```

**Step 2 — Install all dependencies**
```bash
npm install
```

**Step 3 — Configure environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decodelabs_db"
PORT=3000
```
> ⚠️ Replace `YOUR_PASSWORD` with your actual PostgreSQL password.
> Never commit this file to GitHub.

**Step 4 — Run database migrations**
```bash
npx prisma migrate dev --name init
```

**Step 5 — Generate Prisma Client**
```bash
npx prisma generate
```

**Step 6 — Start the development server**
```bash
npx nodemon server.js
```

**Step 7 — Verify the server is running**

Open your browser or Thunder Client:
```
GET http://localhost:3000
```

Expected response:
```json
{
  "success": true,
  "project": "DecodeLabs — Project 3: Database Integration",
  "status": "Server is live and connected to the database.",
  "endpoints": {
    "users": "/api/users",
    "posts": "/api/posts"
  }
}
```

---

## API Reference

### Base URL
```
http://localhost:3000
```

---

## Users Endpoints

### ➕ Create a User
```
POST /api/users
```
**Request Body:**
```json
{
  "name": "Ali Hassan",
  "email": "ali@example.com"
}
```
**Success — 201 Created:**
```json
{
  "message": "User created successfully!",
  "user": {
    "id": 1,
    "name": "Ali Hassan",
    "email": "ali@example.com",
    "createdAt": "2026-06-27T05:19:00.012Z"
  }
}
```

---

### 📋 Get All Users
```
GET /api/users
```
**Success — 200 OK:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "Ali Hassan",
      "email": "ali@example.com",
      "createdAt": "2026-06-27T05:19:00.012Z"
    }
  ]
}
```

---

### 🔍 Get User by ID
```
GET /api/users/:id
```
**Success — 200 OK:**
```json
{
  "user": {
    "id": 1,
    "name": "Ali Hassan",
    "email": "ali@example.com",
    "createdAt": "2026-06-27T05:19:00.012Z"
  }
}
```

---

### ✏️ Update a User
```
PUT /api/users/:id
```
**Request Body:**
```json
{
  "name": "Ali Hassan Updated",
  "email": "ali.updated@example.com"
}
```
**Success — 200 OK:**
```json
{
  "message": "User updated!",
  "user": {
    "id": 1,
    "name": "Ali Hassan Updated",
    "email": "ali.updated@example.com"
  }
}
```

---

### 🗑️ Delete a User
```
DELETE /api/users/:id
```
**Success — 200 OK:**
```json
{
  "message": "User deleted!"
}
```

---

## Posts Endpoints

### ➕ Create a Post
```
POST /api/posts
```
**Request Body:**
```json
{
  "title": "My First Database Post",
  "content": "This post demonstrates a 1:Many relationship between Users and Posts.",
  "userId": 1
}
```
**Success — 201 Created:**
```json
{
  "success": true,
  "message": "Post created and persisted to the database successfully.",
  "post": {
    "id": 1,
    "title": "My First Database Post",
    "content": "This post demonstrates a 1:Many relationship between Users and Posts.",
    "userId": 1,
    "createdAt": "2026-06-27T05:54:02.634Z",
    "user": {
      "name": "Ali Hassan",
      "email": "ali@example.com"
    }
  }
}
```

---

### 📋 Get All Posts
```
GET /api/posts
```
**Success — 200 OK:**
```json
{
  "success": true,
  "count": 1,
  "posts": [
    {
      "id": 1,
      "title": "My First Database Post",
      "content": "This post demonstrates a 1:Many relationship.",
      "userId": 1,
      "createdAt": "2026-06-27T05:54:02.634Z",
      "user": {
        "id": 1,
        "name": "Ali Hassan",
        "email": "ali@example.com"
      }
    }
  ]
}
```

---

### 🔍 Get Post by ID
```
GET /api/posts/:id
```
**Success — 200 OK:**
```json
{
  "success": true,
  "post": {
    "id": 1,
    "title": "My First Database Post",
    "content": "This post demonstrates a 1:Many relationship.",
    "userId": 1,
    "user": {
      "id": 1,
      "name": "Ali Hassan",
      "email": "ali@example.com"
    }
  }
}
```

---

### ✏️ Update a Post
```
PUT /api/posts/:id
```
**Request Body:**
```json
{
  "title": "Updated Post Title",
  "content": "This content has been successfully updated in the database."
}
```
**Success — 200 OK:**
```json
{
  "success": true,
  "message": "Post record updated successfully in the database.",
  "post": {
    "id": 1,
    "title": "Updated Post Title",
    "content": "This content has been successfully updated in the database."
  }
}
```

---

### 🗑️ Delete a Post
```
DELETE /api/posts/:id
```
**Success — 200 OK:**
```json
{
  "success": true,
  "message": "Post record has been permanently deleted from the database."
}
```

---

## CRUD to HTTP Mapping

As demonstrated in this project:

| CRUD Operation | HTTP Method | SQL Equivalent | Status Code |
|----------------|-------------|----------------|-------------|
| **Create** | POST | INSERT | 201 Created |
| **Read All** | GET | SELECT * | 200 OK |
| **Read One** | GET | SELECT WHERE id | 200 OK |
| **Update** | PUT | UPDATE WHERE id | 200 OK |
| **Delete** | DELETE | DELETE WHERE id | 200 OK |

---

## Error Handling

All endpoints return consistent, structured error responses:

| Status Code | Scenario |
|-------------|----------|
| **400** | Bad Request — Validation failed (missing or invalid fields) |
| **404** | Not Found — Record does not exist in the database |
| **409** | Conflict — Duplicate unique field (email already registered) |
| **500** | Internal Server Error — Unexpected server-side failure |

**Example — 400 Validation Error:**
```json
{
  "errors": [
    {
      "msg": "Name zaroori hai",
      "path": "name"
    },
    {
      "msg": "Valid email daalen",
      "path": "email"
    }
  ]
}
```

**Example — 409 Conflict (Duplicate Email):**
```json
{
  "error": "Yeh email pehle se exist karta hai"
}
```

**Example — 404 Not Found:**
```json
{
  "error": "User nahi mila"
}
```

---

## Security Implementation

This project implements **Pillar 4: The Shield** through the following measures:

### 1. SQL Injection Prevention
Prisma ORM uses **parameterized queries** internally, which means all user
input is treated strictly as data — never as executable SQL logic.

```
❌ Vulnerable:  "SELECT * FROM users WHERE email = '" + userInput + "'"
✅ Secure:      prisma.user.findUnique({ where: { email: userInput } })
```

### 2. Input Validation
All `POST` and `PUT` routes are protected by `express-validator` middleware
that enforces field requirements before any database operation is executed.

### 3. Schema-Level Constraints
Data integrity is enforced directly at the database level:

| Constraint | Applied To | Purpose |
|-----------|-----------|---------|
| `UNIQUE` | email | Prevents duplicate user accounts |
| `NOT NULL` | name, email, title, content | Ensures critical fields are never empty |
| `Foreign Key` | post.userId | Maintains referential integrity |

### 4. Environment Variables
All sensitive credentials (database URL, port) are stored in a `.env` file
which is listed in `.gitignore` and never committed to version control.

---

## Developer Information

| Field | Detail |
|-------|--------|
| **Name** | Your Name Here |
| **Program** | Full Stack Development |
| **Organization** | DecodeLabs |
| **Batch** | 2026 |
| **Project** | Project 3 — Database Integration |
| **Completed** | June 2026 |

---

## License

This project was built as part of the **DecodeLabs Industrial Training Program**.
For educational and portfolio purposes only.# DecodeLabs_Project-03_Abdul-Wahab
