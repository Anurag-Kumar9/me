# Portfolio - Personal Profile App

A full-stack portfolio application built with Node.js, Express, MongoDB, and HTML5 UP Massively template. Display your profile, projects, skills, and education with a beautiful responsive design.

##  Architecture

```
frontend/          → Static HTML/CSS/JS (Massively template)
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   │   ├── api.js (fetches data from backend)
│   │   └── main.js
│   └── images/

backend/           → Node.js + Express API
├── app.js         (main server, serves frontend + API)
├── config/
│   └── db.js      (MongoDB connection)
├── models/
│   └── Profile.js (Mongoose schema)
├── controllers/
│   └── profileController.js
├── routes/
│   └── profileRoutes.js
├── seed.js        (populate database)
└── .env           (environment variables)
```

##  Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### Installation

1. **Clone and install dependencies**
```bash
cd backend
npm install
```

2. **Setup environment variables** (`backend/.env`)
```
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=ClusterName
```

3. **Seed the database**
```bash
node seed.js
```

4. **Start the server**
```bash
npm start         # Production: node app.js
npm run dev       # Development: nodemon app.js
```

5. **Open in browser**
```
http://localhost:3000
```

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get your full profile |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects?skill=python` | Filter projects by tech stack |
| GET | `/api/health` | Health check |

##  Database Schema

See [schema.md](schema.md) for detailed schema documentation, indexes, and data structure.

##  Adding More Projects

Edit `backend/seed.js` and add to the `projects` array:

```javascript
projects: [
  {
    title: "Your Project Name",
    description: ["Description 1", "Description 2"],
    techStack: ["React", "Node.js", "MongoDB"],
    repo: "https://github.com/your-repo"
  }
]
```

Then run:
```bash
node seed.js
```

##  Project Structure

- **Frontend**: Massively HTML5 template - responsive, no build step needed
- **Backend**: Express.js REST API with Mongoose ODM
- **Database**: MongoDB Atlas with indexed text search
- **Static**: Backend serves frontend as static files from `/frontend`

##  Key Features

-  Responsive design (mobile-friendly)
-  Dynamic profile data from MongoDB
-  Project showcase with tech stack filtering
-  Social links (GitHub, LinkedIn, Resume)
-  Text search across profile data
-  Clean API architecture
-  Environment variable configuration

##  Files Overview

| File | Purpose |
|------|---------|
| `backend/app.js` | Express server, serves frontend + API routes |
| `backend/seed.js` | Populate MongoDB with profile/project data |
| `backend/models/Profile.js` | Mongoose schema with indexes |
| `frontend/index.html` | Single-page portfolio display |
| `frontend/assets/js/api.js` | Frontend API client |

##  Deployment

The backend serves the entire app - just deploy the `backend` folder:

```bash
npm start
```

The frontend files are served statically from `backend/app.js`.

##  Learn More

- [Database Schema & Indexes](schema.md)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express Documentation](https://expressjs.com/)
