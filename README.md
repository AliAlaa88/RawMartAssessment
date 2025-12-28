# Task Management Application

A full-stack task management application built with Laravel (backend) and React (frontend).

## Tech Stack

### Backend

- **Framework**: Laravel 11
- **Authentication**: Laravel Sanctum (JWT-style tokens)
- **Database**: PostgreSQL (Supabase)

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **i18n**: react-i18next (English/Arabic)
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest + React Testing Library

## Project Structure

```
/backend          # Laravel API
/frontend         # React SPA
README.md
```

## Setup Instructions

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env

# Edit .env with your database credentials:
# DB_CONNECTION=pgsql
# DB_HOST=your-supabase-host
# DB_PORT=5432
# DB_DATABASE=postgres
# DB_USERNAME=postgres
# DB_PASSWORD=your-password

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server
php artisan serve
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

## Running the Project

1. Start the backend: `cd backend && php artisan serve` (runs on http://localhost:8000)
2. Start the frontend: `cd frontend && npm run dev` (runs on http://localhost:5173)
3. Open http://localhost:5173 in your browser

## API Endpoints

| Method | Endpoint          | Description                   | Auth |
| ------ | ----------------- | ----------------------------- | ---- |
| POST   | `/api/register`   | Register new user             | No   |
| POST   | `/api/login`      | Login user                    | No   |
| POST   | `/api/logout`     | Logout user                   | Yes  |
| GET    | `/api/user`       | Get current user              | Yes  |
| GET    | `/api/tasks`      | List user's tasks (paginated) | Yes  |
| POST   | `/api/tasks`      | Create new task               | Yes  |
| GET    | `/api/tasks/{id}` | Get single task               | Yes  |
| PUT    | `/api/tasks/{id}` | Update task                   | Yes  |
| DELETE | `/api/tasks/{id}` | Delete task                   | Yes  |

### Task Object

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Optional description",
  "status": "pending | in_progress | done",
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000000Z",
  "updated_at": "2024-01-01T00:00:00.000000Z"
}
```

## Features

### Authentication

- User registration with validation
- User login with JWT tokens
- Protected routes (frontend)
- Token-based API authentication

### Task Management

- Create tasks with title and optional description
- Update task status (pending, in_progress, done)
- Edit task details
- Delete tasks
- Paginated task list
- Users can only access their own tasks

### UI/UX

- Clean, responsive layout
- Dark mode support (CSS variables)
- Loading and error states
- Form validation
- Internationalization (EN/AR)

## Assumptions Made

1. **No email verification** - Users can login immediately after registration
2. **No password reset** - Not implemented to keep scope simple
3. **No refresh tokens** - On 401 error, user is logged out and redirected
4. **Single session** - No multi-device session management
5. **Local storage** - Tokens stored in localStorage (acceptable for this scope)

## Testing

### Backend Tests

```bash
cd backend
php artisan test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Environment Variables

### Backend (.env)

```
DB_CONNECTION=pgsql
DB_HOST=your-host
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000/api
```

## License

MIT
