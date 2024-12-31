# Task Tango - Advanced MERN Todo App

<div align="center">
<img
    src="./client/public/task-tango-logo.png"
    alt="Task Tango Logo"
    width="300"
    height="300"
    style="border-radius: 50%; overflow: hidden;"
  />

<!-- Main Tech Stack -->
<p>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-v18.2-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React 18"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-v5.0-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-v18.x-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-v6.0-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  </a>
</p>

<!-- Frontend Dependencies -->
<p>
  <a href="https://tanstack.com/router/latest">
    <img src="https://img.shields.io/badge/TanStack%20Router-v1.15-%23FF4154.svg?style=for-the-badge&logo=react-router&logoColor=white" alt="TanStack Router"/>
  </a>
  <a href="https://tanstack.com/query/latest">
    <img src="https://img.shields.io/badge/TanStack%20Query-v5.0-%23FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-v3.4-%2306B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  </a>
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/shadcn%2Fui-latest-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
  </a>
</p>

<!-- Additional Tools -->
<p>
  <a href="https://axios-http.com/">
    <img src="https://img.shields.io/badge/Axios-v1.6-%235A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  </a>
  <a href="https://www.npmjs.com/package/react-hook-form">
    <img src="https://img.shields.io/badge/React%20Hook%20Form-v7.49-%23EC5990.svg?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form"/>
  </a>
  <a href="https://zod.dev/">
    <img src="https://img.shields.io/badge/Zod-v3.22-%233068B7.svg?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
  </a>
</p>

<!-- Authentication & Security -->
<p>
  <a href="https://jwt.io/">
    <img src="https://img.shields.io/badge/JWT-latest-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT"/>
  </a>
  <a href="https://www.npmjs.com/package/bcrypt">
    <img src="https://img.shields.io/badge/BCrypt-v5.1-%23404d59.svg?style=for-the-badge" alt="BCrypt"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Express.js-v4.18-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  </a>
</p>

<!-- License -->
<p>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT"/>
  </a>
</p>

</div>

<!-- Add quick links for easy navigation -->
<div align="center">
  <a href="#-features">Features</a> •
  <a href="#%EF%B8%8F-technologies">Technologies</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-license">License</a>
</div>

Task Tango is an intuitive task management application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript.

## 🌟 Features

- **User Authentication**: Secure login and registration
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Time Tracking**: Automatic timestamp tracking for task creation and updates
- **Responsive Design**: Full mobile device compatibility
- **Dark/Light Mode**: Theme switching for better user experience

## 🛠️ Technologies

### Frontend

- React 18 with TypeScript
- TanStack Router for routing
- TanStack Query for state management
- Tailwind CSS with shadcn/ui for styling
- Axios for HTTP requests
- React Hook Form with Zod for form validation

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone git@github.com:Kris1027/mern-advanced-todo-app.git
cd mern-advanced-todo-app
```

2. **Install dependencies**

```bash
# Install all dependencies (both frontend and backend)
npm install
```

3. **Environment Setup**

- Create `.env` file in the `server` folder

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=production
```

4. **Available Scripts**

```bash
# Development
npm run dev         # Run both frontend and backend in development mode
npm run client     # Run only frontend in development mode
npm run server     # Run only backend in development mode

# Build
npm run build      # Build both frontend and backend
npm run build-client  # Build only frontend
npm run build-server  # Build only backend

# Production
npm run start      # Run both frontend and backend in production mode
npm run start-client  # Run only frontend in production mode
npm run start-server  # Run only backend in production mode
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [TanStack](https://tanstack.com/) for awesome React tools

## 📧 Contact

Krzysztof Obarzanek - [LinkedIn](https://www.linkedin.com/in/krzysztof-obarzanek/)
