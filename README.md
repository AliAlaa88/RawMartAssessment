# Task Management Application

## Live Demo

### The Docker config and deployment cycle are working but there is a CORS error and no time to solve it. Maybe Until you see my submission i would have solved it, so check first.

- **Frontend**: https://front-production-d34e.up.railway.app/
- **Backend API**: https://rawmartassessment-production.up.railway.app/

## Tech Stack

### Backend

- **Framework**: Laravel 11
- **Authentication**: Laravel Sanctum (token-based)
- **Database**: PostgreSQL

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **i18n**: react-i18next (English/Arabic)
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest + React Testing Library

---

## Setup Instructions

### Prerequisites

- PHP 8.2+ with Composer
- Node.js 18+
- PostgreSQL

---

## Quick Start

### Option 1:

**Windows (PowerShell):**

```powershell
.\start.ps1
```

**Linux/Mac/Git Bash:**

```bash
chmod +x start.sh && ./start.sh
```

This opens two terminals, installs dependencies, and starts both servers automatically.

### Option 2: Manual Setup

#### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Running the Application

| Service  | Local URL                 |
| -------- | ------------------------- |
| Frontend | http://localhost:5173     |
| Backend  | http://localhost:8000     |
| API Base | http://localhost:8000/api |

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description       | Auth Required |
| ------ | --------------- | ----------------- | ------------- |
| POST   | `/api/register` | Register new user | No            |
| POST   | `/api/login`    | Login user        | No            |
| POST   | `/api/logout`   | Logout user       | Yes           |
| GET    | `/api/user`     | Get current user  | Yes           |

### Tasks (CRUD)

| Method | Endpoint          | Description                   | Auth Required |
| ------ | ----------------- | ----------------------------- | ------------- |
| GET    | `/api/tasks`      | List user's tasks (paginated) | Yes           |
| POST   | `/api/tasks`      | Create new task               | Yes           |
| PUT    | `/api/tasks/{id}` | Update task                   | Yes           |
| DELETE | `/api/tasks/{id}` | Delete task                   | Yes           |

## Features

### Authentication

- User registration with email/password validation
- Token-based authentication (Laravel Sanctum)
- Protected routes on frontend
- Automatic logout on 401 errors

### Task Management

- Create, read, update, delete tasks
- Task status workflow (pending → in_progress → done)
- Paginated task list
- Users can only access their own tasks

### UI/UX

- Responsive design
- Dark mode support
- Loading and error states
- Client-side form validation
- Internationalization (English/Arabic with RTL support)

---