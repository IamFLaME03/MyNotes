# MyNotes

MyNotes is a full-stack web application for creating, managing, and exporting notes. It features a modern, clean UI powered by React (Vite) and a robust backend powered by Node.js, Express, and MongoDB.

## Features

- **Create Notes:** Easily draft and save notes with titles and content.
- **Update Notes:** Modify the content or title of existing notes seamlessly.
- **View Notes:** See all your stored notes, organized beautifully.
- **Delete Notes:** Remove notes you no longer need.
- **Selective Export:** Download a single note, specific selected notes, or all your notes as a clean `.txt` file.
- **Activity Logging:** Backend records all note creations and deletions locally using asynchronous file operations.

## Architecture

- **Frontend:** React, Vite, TailwindCSS (v4), react-hook-form, react-toastify
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
   `PORT=5001`
4. Start the server:
   - Development: `node server.js` (or setup Nodemon later)

### Docker Setup (Recommended)
You can run the entire stack using Docker Compose. Ensure you have Docker Desktop installed.

1. Create your `.env` file in the root directory (or just use `backend/.env`) with `MONGO_URI`.
2. Run the following command from the root directory:
   ```bash
   docker-compose up --build
   ```
3. The frontend will be available at `http://localhost:80` and the backend at `http://localhost:5001`.

---

## API Endpoints

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/api/notes`     | Create note                   |
| GET    | `/api/notes`     | Fetch all notes               |
| PUT    | `/api/notes/:id` | Update note                   |
| DELETE | `/api/notes/:id` | Delete note                   |
| GET    | `/api/export`    | Export notes (`?ids=...` opt) |

