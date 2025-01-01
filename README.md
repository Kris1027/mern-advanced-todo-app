<div align="center">
    <h1>Task Tango - Advanced MERN Todo App</h1>
    <img
      src="./client/public/logo.png"
      alt="Task Tango Logo"
      width="300"
      height="300"
    />

<a href="#-features">Features</a> •
<a href="#%EF%B8%8F-technologies">Technologies</a> •
<a href="#-getting-started">Getting Started</a> •
<a href="#-contact">Contact</a>

<p>Task Tango is an intuitive task management application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript. </p>

</div>

## 🌟 Features

- **User Authentication**: Secure login and registration with JWT tokens and password hashing
- **Task Management**: Create, edit, delete, and mark tasks as complete with real-time updates
- **Time Tracking**: Automatic timestamp tracking for task creation, updates and completion
- **Responsive Design**: Full mobile and tablet compatibility with modern UI components
- **Dark/Light Mode**: System-synced theme switching for better user experience
- **Form Validation**: Client and server-side validation using Zod schemas
- **Data Caching**: Optimized data fetching with TanStack Query
- **Type Safety**: Full TypeScript support across frontend and backend
- **API Security**: CORS protection and request compression
- **Modern Stack**: Built with React, Express, and MongoDB
- **Clean Architecture**: Well-structured codebase with consistent code formatting
- **Developer Experience**: Hot reloading and fast build times with Vite
- **Accessibility**: ARIA compliant components using Radix UI
- **Error Handling**: Toast notifications for user feedback

## 🛠️ Technologies

### Frontend

- React 18 with TypeScript
- TanStack Router for routing
- TanStack Query for state management
- Tailwind CSS with shadcn/ui for styling
- Radix UI for accessible components
- Lucide React for icons
- Axios for HTTP requests
- React Hook Form with Zod for form validation
- React Hot Toast for notifications
- Vite for build tooling

### Backend

- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Compression for response optimization
- CORS for cross-origin requests
- Cookie Parser for cookie handling
- dotenv for environment variables
- Zod for schema validation

### Development

- ESLint for linting
- Prettier for code formatting
- TypeScript ESLint for TS-specific linting

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

## 👏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [TanStack](https://tanstack.com/) for awesome React tools
- [React](https://react.dev/) for frontend library
- [Tailwind](https://tailwindcss.com/) for simple styling
- [Express](https://expressjs.com/) for fast backend
- [MongoDB](https://mongodb.com/) for modern database
- [TypeScript](https://typescriptlang.org/) for safer code
- [Zod](https://zod.dev/) for schema validation
- [React-Hook-Form](https://react-hook-form.com/)React Hook Form for better forms
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vite](https://vite.dev/)for fast development
- [ESLint](https://eslint.org/) for clean code
- [Prettier](https://prettier.io/) for consistent formatting
- [JWT](https://jwt.io/)JWT for secure auth

## 📧 Contact

- Krzysztof Obarzanek - [LinkedIn](https://www.linkedin.com/in/krzysztof-obarzanek/)
- About me - [Portfolio](https://www.kris1027.pl/)
- Business - [Web-Services](https://websites.kris1027.pl/)
