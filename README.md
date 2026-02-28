# MyNotes

MyNotes is a full-stack web application for creating, managing, and exporting notes. It features a modern, clean UI powered by React (Vite) and a robust backend powered by Node.js, Express, and MongoDB.

## Features

- **Create Notes:** Easily draft and save notes with titles and content.
- **View Notes:** See all your stored notes, organized beautifully.
- **Delete Notes:** Remove notes you no longer need.
- **Export Notes:** Download all your notes as a clean `.txt` file.
- **Activity Logging:** Backend records all note creations and deletions locally using asynchronous file operations.

## Architecture

- **Frontend:** React, Vite, Vanilla CSS
- **Backend:** Node.js, Express.js, Mongoose, fs logging
- **Database:** MongoDB

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Atlas or local)

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file from the sample and add your MongoDB password.
   `MONGO_URI=mongodb+srv://...`
   `PORT=5000`
4. Start the server:
   - Development: `node server.js` (or setup Nodemon later)

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

---

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/api/notes`     | Create note          |
| GET    | `/api/notes`     | Fetch all notes      |
| DELETE | `/api/notes/:id` | Delete note          |
| GET    | `/api/export`    | Export notes as .txt |

_More features and Docker support coming soon._
