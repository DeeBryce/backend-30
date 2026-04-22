# Task Manager API

A RESTful API for managing personal tasks, built as part of a 30-day backend challenge. Users can register, log in, and manage their tasks with full CRUD support, filtering, sorting, pagination, and category organization.

---

## Tech Stack

- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs
- Swagger (API Docs)

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repo
```bash
   git clone https://github.com/DeeBryce/backend-30.git
   cd backend-30
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory and add the following:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the server
```bash
   npm run dev
```

---

## API Documentation

Live swagger docs, visit
https://task-manager-api-dqfn.onrender.com/api-docs

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Port the server runs on |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for signing JWT tokens |

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get token | No |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/tasks | Create a task | Yes |
| GET | /api/tasks | Get all tasks | Yes |
| GET | /api/tasks/:id | Get a single task | Yes |
| PUT | /api/tasks/:id | Update a task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

### Query Parameters (GET /api/tasks)
| Parameter | Description |
|-----------|-------------|
| status | Filter by status (pending, in-progress, completed) |
| title | Search by title (partial, case-insensitive) |
| category | Filter by category |
| sortBy | Sort by field (prefix with - for descending) |
| page | Page number (default: 1) |
| limit | Results per page (default: 10) |

---

## Security

- JWT authentication on all task routes
- Password hashing with bcryptjs
- HTTP security headers with Helmet
- Rate limiting (100 requests per 15 minutes)
- CORS enabled

---

Built by Dee Bryce as part of the Backend-30 challenge.