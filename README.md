<div align="center">

<img src="https://capsule-render.vercel.app/api?type=blur&color=0:000000,100:0D0D0D&height=180&section=header&text=TASKFLOW&fontSize=52&fontColor=ffffff&fontAlignY=45&desc=REST%20API%20%E2%80%A2%20AUTH%20%E2%80%A2%20TASK%20MANAGEMENT&descAlignY=68&descSize=15&letterSpacing=6" width="100%"/>

<br/>

<sub>Back-end study project · JWT authentication · Email verification · Private task management</sub>

<br/><br/>

`Node.js` `Express` `PostgreSQL` `Prisma` `JWT` `bcryptjs` `Nodemailer` `Helmet`

<br/>

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

</div>

<br/>

## ⎡ ABOUT ⎦

TaskFlow is a task management API with user authentication, email
verification, password recovery, and private tasks per user.

Built as part of my back-end development studies, focused on
**REST APIs**, **authentication**, **database relationships**, and
**integration with external services**.

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ FEATURES ⎦

<table width="100%">
<tr>
<td width="50%" valign="top">

**Auth & Users**
- User registration
- Email verification with code
- Login with JWT authentication
- Password recovery by email

</td>
<td width="50%" valign="top">

**Tasks**
- Create, list, update, delete tasks
- Mark tasks as completed
- Priority levels: low · medium · high
- Due dates + filters by priority / status

</td>
</tr>
</table>

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ TECH STACK ⎦

<div align="center">

<table width="100%">
<tr>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/nodedotjs/339933" width="38"/><br/>
<sub><b>Node.js</b></sub>
</td>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/express/FFFFFF" width="38"/><br/>
<sub><b>Express</b></sub>
</td>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/postgresql/4169E1" width="38"/><br/>
<sub><b>PostgreSQL</b></sub>
</td>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/prisma/FFFFFF" width="38"/><br/>
<sub><b>Prisma</b></sub>
</td>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/jsonwebtokens/FFFFFF" width="38"/><br/>
<sub><b>JWT</b></sub>
</td>
<td align="center" width="16.6%">
<img src="https://cdn.simpleicons.org/javascript/F7DF1E" width="38"/><br/>
<sub><b>JavaScript</b></sub>
</td>
</tr>
</table>

</div>

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ PROJECT STRUCTURE ⎦

```txt
taskFlow/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── index.html
├── tarefas.html
├── index.js
├── package.json
└── README.md
```

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ GETTING STARTED ⎦

**Prerequisites**

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/)
- A Gmail account (for Nodemailer)

<br/>

**1 · Clone the repository**

```bash
git clone https://github.com/gustavoverenka/taskFlow.git
cd taskFlow
```

**2 · Install dependencies**

```bash
# Linux / macOS
npm install

# Windows (PowerShell)
npm.cmd install
```

> If PowerShell blocks the command, run it as Administrator or use the Node.js Command Prompt.

**3 · Configure environment variables**

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
JWT_SECRET="your_secret_key"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_app_password"
PORT=3000
```

> Use a [Gmail App Password](https://support.google.com/accounts/answer/185833) for `EMAIL_PASS`, not your regular password.

**4 · Run Prisma migrations**

```bash
# Linux / macOS
npx prisma migrate dev

# Windows (PowerShell)
npx.cmd prisma migrate dev
```

**5 · Start the server**

```bash
node index.js
```

<div align="center">

API available at **`http://localhost:3000`**

</div>

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ API ROUTES ⎦

**Authentication**

| Method | Route | Description |
|:------:|-------|-------------|
| `POST` | `/auth/cadastro` | Registers a new user |
| `POST` | `/auth/verificar` | Verifies the user's email |
| `POST` | `/auth/reenviar-codigo` | Resends the verification code |
| `POST` | `/auth/login` | Logs in and returns a JWT token |
| `POST` | `/auth/esqueci-senha` | Sends a password recovery code |
| `POST` | `/auth/redefinir-senha` | Resets the user's password |

**Tasks**

> All task routes require a valid JWT token:
> `Authorization: Bearer <your_token>`

| Method | Route | Description |
|:------:|-------|-------------|
| `GET` | `/tarefas` | Lists tasks from the authenticated user |
| `POST` | `/tarefas` | Creates a new task |
| `PUT` | `/tarefas/:id` | Updates a task |
| `PATCH` | `/tarefas/:id/completar` | Marks a task as completed |
| `DELETE` | `/tarefas/:id` | Deletes a task |

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ REQUEST EXAMPLES ⎦

<details>
<summary><b>Register</b></summary>

```json
POST /auth/cadastro

{
  "nome": "John Doe",
  "email": "john@example.com",
  "senha": "123456"
}
```

</details>

<details>
<summary><b>Verify Email</b></summary>

```json
POST /auth/verificar

{
  "email": "john@example.com",
  "codigo": "123456"
}
```

</details>

<details>
<summary><b>Login</b></summary>

```json
POST /auth/login

{
  "email": "john@example.com",
  "senha": "123456"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

</details>

<details>
<summary><b>Create Task</b></summary>

```json
POST /tarefas
Authorization: Bearer <your_token>

{
  "titulo": "Study Prisma",
  "descricao": "Practice migrations and relationships",
  "prioridade": "ALTA",
  "dataLimite": "2026-05-20"
}
```

</details>

<br/>

**Task Filters**

```http
GET /tarefas?prioridade=ALTA
GET /tarefas?concluida=false
GET /tarefas?prioridade=ALTA&concluida=false
```

Available values for `prioridade`: `ALTA` · `MEDIA` · `BAIXA`

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ SECURITY ⎦

- Password hashing with `bcryptjs`
- JWT authentication
- Protected task routes with middleware
- Email verification on registration
- Password recovery with temporary code
- Sensitive data stored in environment variables
- Basic HTTP security headers with `Helmet`

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ WHAT I LEARNED ⎦

- Building REST APIs with Express
- User authentication with JWT
- Password encryption with bcryptjs
- Database modeling with Prisma ORM
- PostgreSQL integration
- Sending emails with Nodemailer
- Protecting routes with middleware
- Consuming an API with fetch on the front-end
- Working with filters using query parameters

<div align="center">

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

</div>

## ⎡ ROADMAP ⎦

- [ ] Deploy the application
- [ ] Add automated tests
- [ ] Add Swagger/OpenAPI documentation
- [ ] Improve responsive design
- [ ] Add task editing in the front-end
- [ ] Improve error handling and validations

<br/>

<div align="center">

<sub>◈ project status: under development for study and portfolio purposes ◈</sub>

</div>

<img src="https://capsule-render.vercel.app/api?type=blur&color=0:0D0D0D,100:000000&height=90&section=footer" width="100%"/>
