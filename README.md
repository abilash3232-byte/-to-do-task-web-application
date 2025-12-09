A to-do system built using **React**, **Node.js**, **Express**, and **MySQL**, fully containerized using **Docker** and **Docker Compose**.

## Running the Application

You can run the entire system with using Docker Compose.

### Prerequisites
- Docker Desktop installed  
- Port **3000**, **5000**, and **3306** free

---

## **Start All Services**

From the `Assessment/` directory:

docker compose up --build

To stop:

docker compose down

### Running Tests (without Docker)
Backend tests
cd backend
npm test

Frontend tests
cd frontend/frontend
npm test


## Features

### Functional Requirements
- Create a new task
- View latest 5 tasks on the Add Task page
- View all created tasks
- Mark task as completed
- Delete completed tasks
- Responsive UI using Material UI (MUI)

### Backend
- REST API using Node.js + Express
- MySQL persistent storage
- Proper error handling and validations

### Frontend
- React SPA (via Vite)
- MUI components
- Tabs for navigation between:
  - Add Task
  - All Tasks
  - Completed Tasks

### Testing
- Unit tests for backend controllers  
- Integration tests for backend routes  
- Component tests for React frontend  
- Jest + React Testing Library  
- Test coverage reporting enabled

### Docker
- Backend container  
- Frontend container (served via NGINX)  
- MySQL container with initialization script  
- One-command startup (`docker compose up --build`)

---

## 2. Technologies Used

Frontend     => React 19, Vite, Material UI |
Backend      => Node.js, Express |
Database     => MySQL 8 |
Testing      => Jest, Supertest, React Testing Library |
Container    => Docker, Docker Compose |
Language     => JavaScript |

