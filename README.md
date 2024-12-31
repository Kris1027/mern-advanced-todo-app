# Task Tango - Advanced MERN Todo App

<div align="center">
  <img src="./client/public/logo.png" alt="Task Tango Logo" width="300" height="300">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
