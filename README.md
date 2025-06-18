# 🧠 Routinee Backend

This is the backend API for the Routinee habit tracking application. It is built with **Node.js**, **Express**, and **PostgreSQL**, and it serves as the data layer for the frontend React application.

## 🛠️ Technologies Used

- Node.js
- Express
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- cors
- morgan

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <your-backend-repo-url>
2. Navigate into the project:
    cd final-back
3. Install dependencies:
    npm install
4. Start the server:
    start server.js   

## 📁 Project Structure
final-back/
│
├── db/
│   └── index.js         # Database connection using pg
│
├── routes/
│   └── habits.js        # Express router for habit endpoints
│
├── .env                 # Environment variables
├── server.js            # App entry point
├── package.json
└── README.md

## 🌐 API Endpoints
🔗 Base URL: http://localhost:4000/api/habits


---

## 🧾 Endpoints Summary

### GET `/api/habits`
- **Description:** Retrieve all habits (most recent first).
- **Response:** Array of habit objects.

---

### GET `/api/habits/:id`
- **Description:** Retrieve a specific habit by its ID.
- **Response:** A single habit object.
- **Status Codes:**
  - `200 OK` – Habit found.
  - `404 Not Found` – Habit doesn't exist.

---

### POST `/api/habits`
- **Description:** Add a new habit.
- **Request Body:**
```json
{
  "title": "Read 10 pages",
  "completed": false,
  "targetDate": "2025-06-30"
}
- **Response:** The newly created habit.
- **Status Codes:** 201 Created

---

### PUT /api/habits/:id
- **Description:** Add a new habit.
- **Request Body:**
```json
{
  "title": "Exercise",
  "completed": true,
  "targetDate": "2025-07-01"
}
- **Response:** The updated habit object.
- **Status Codes:**
  - 200 OK – Updated successfully.
  - 404 Not Found – Habit not found.
---

### DELETE /api/habits/:id
- **Description:** Delete a habit by ID.
- **Request Body:**
```json
{
  "message": "Habit deleted successfully"
}

- **Response:** The updated habit object.
- **Status Codes:**
  - 200 OK – Deleted successfully.
  - 404 Not Found – Habit not found.
---
