# 🌾 KisanSetu — Farmer Marketplace

A full-stack agricultural marketplace connecting farmers directly with buyers.

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | Next.js 14 (App Router, TS) |
| Backend   | Node.js + Express           |
| Database  | MongoDB + Mongoose          |

---

## Project Structure

```
Kisan Setu/
├── frontend/          # Next.js app
│   ├── app/           # App Router pages & layouts
│   ├── components/    # Reusable UI components
│   └── public/        # Static assets
│
├── backend/           # Express API server
│   ├── server.js      # Entry point
│   └── src/
│       ├── app.js     # Express app config
│       ├── config/
│       │   └── db.js  # MongoDB connection
│       ├── routes/
│       │   └── testRoutes.js
│       └── middleware/
│           └── errorHandler.js
│
└── .gitignore
```

---

## Getting Started

### 1. Run Everything (Recommended)
You can now start both the backend and frontend with a single command from the root directory:
```bash
npm run dev
```

### 2. Manual Start
**Backend:**
```bash
cd backend
npm run dev                 # http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev                 # http://localhost:3000
```

---

## API Routes

| Method | Endpoint    | Description        |
|--------|-------------|--------------------|
| GET    | /api/test   | Server health check|

---

## Environment Variables (backend/.env)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/kisansetu
CLIENT_URL=http://localhost:3000
```
