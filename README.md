# TaskFlow

TaskFlow is a task management application with user authentication, email verification, password recovery, and private tasks for each user.

This project was built as part of my back-end development studies, focusing on REST APIs, authentication, database relationships, and integration with external services.

## Features

- User registration
- Email verification with code
- Login with JWT authentication
- Password recovery by email
- Create tasks
- List tasks from the authenticated user
- Mark tasks as completed
- Delete tasks
- Task priority: low, medium, and high
- Task due date
- Filter tasks by priority and status

## Technologies

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- Nodemailer
- Helmet
- HTML
- CSS
- JavaScript

## Project Structure

```txt
Project-final-API/
|-- prisma/
|   |-- schema.prisma
|-- src/
|   |-- controllers/
|   |-- middleware/
|   |-- routes/
|   |-- services/
|-- index.html
|-- tarefas.html
|-- index.js
|-- package.json
|-- README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gustavoverenka/taskFlow
```

### 2. Enter the project folder

```bash
cd Project-final-API
```

### 3. Install dependencies

```bash
npm install
```

On Windows, if PowerShell blocks the command, use:

```bash
npm.cmd install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
JWT_SECRET="your_secret_key"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_app_password"
PORT=3000
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
```

On Windows, if needed:

```bash
npx.cmd prisma migrate dev
```

### 6. Start the server

```bash
node index.js
```

The API will be available at:

```txt
http://localhost:3000
```

## API Routes

### Authentication

| Method | Route | Description |
|---|---|---|
| POST | `/auth/cadastro` | Registers a new user |
| POST | `/auth/verificar` | Verifies the user's email |
| POST | `/auth/reenviar-codigo` | Resends the email verification code |
| POST | `/auth/login` | Logs in and returns a JWT token |
| POST | `/auth/esqueci-senha` | Sends a password recovery code |
| POST | `/auth/redefinir-senha` | Resets the user's password |

### Tasks

| Method | Route | Description |
|---|---|---|
| GET | `/tarefas` | Lists tasks from the authenticated user |
| POST | `/tarefas` | Creates a new task |
| PUT | `/tarefas/:id` | Updates a task |
| PATCH | `/tarefas/:id/completar` | Marks a task as completed |
| DELETE | `/tarefas/:id` | Deletes a task |

## Request Examples

### Register

```json
{
  "nome": "John Doe",
  "email": "john@example.com",
  "senha": "123456"
}
```

### Verify Email

```json
{
  "email": "john@example.com",
  "codigo": "123456"
}
```

### Login

```json
{
  "email": "john@example.com",
  "senha": "123456"
}
```

Example response:

```json
{
  "token": "jwt_token_here"
}
```

### Create Task

```json
{
  "titulo": "Study Prisma",
  "descricao": "Practice migrations and relationships",
  "prioridade": "ALTA",
  "dataLimite": "2026-05-20"
}
```

## Task Filters

```http
GET /tarefas?prioridade=ALTA
GET /tarefas?concluida=false
GET /tarefas?prioridade=ALTA&concluida=false
```

## Security

This project includes:

- Password hashing with bcryptjs
- JWT authentication
- Protected task routes with middleware
- Email verification
- Password recovery with temporary code
- Sensitive data stored in environment variables
- Basic HTTP security headers with Helmet

## What I Learned

During this project, I practiced:

- Building REST APIs with Express
- User authentication with JWT
- Password encryption
- Database modeling with Prisma
- PostgreSQL integration
- Sending emails with Nodemailer
- Protecting routes with middleware
- Consuming an API with fetch on the front-end
- Working with filters using query parameters

## Future Improvements

- Deploy the application
- Add automated tests
- Add Swagger/OpenAPI documentation
- Improve responsive design
- Add task editing in the front-end
- Improve error handling and validations

## Project Status

This project is under development for study and portfolio purposes.
