# University Achievement System

University Achievement System is a full-stack web application for collecting, displaying and managing student and faculty achievements across academic, technical, sports, cultural, leadership and professional categories.

## Features

- Public wall-of-fame style achievement browsing.
- Category pages for technical, sports, cultural and academic achievements.
- Admin access flow for managing records.
- Achievement submission with structured fields such as department, year, semester, category, event, level and participant details.
- Image upload support through Multer and Cloudinary.
- REST API for adding, listing and deleting achievements.
- MongoDB model with validation for achievement categories and levels.

## Tech Stack

Frontend:
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary
- CORS
- dotenv

## API Overview

```text
GET    /api/achievements/all
POST   /api/achievements/add
DELETE /api/achievements/delete/:id
```

## Environment Variables

Backend `.env`:

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Getting Started

Run the backend:

```bash
cd backend
npm install
node server.js
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Resume Highlights

- Built a full-stack achievement management platform with React, Express and MongoDB.
- Integrated Cloudinary image uploads using Multer storage.
- Designed REST endpoints for create, read and delete workflows.
- Modeled structured achievement data with validation using Mongoose.
