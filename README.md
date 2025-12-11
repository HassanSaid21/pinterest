# 📌 Full Stack Pinterest Clone

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack social media application inspired by Pinterest, built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to create, share, and interact with visual content ("pins") in a modern, responsive interface.

## 🚀 Features

-   **User Authentication**: Secure login and registration using JWT and HTTP-only cookies.
-   **Pin Management**: Create, view, delete, and save pins.
-   **Interactions**: Like, save, and comment on pins.
-   **Image Upload**: Seamless image uploading and optimization using ImageKit and Sharp.
-   **Responsive Design**: Modern UI built with React and CSS.
-   **Infinite Scroll**: Smooth browsing experience.
-   **State Management**: Efficient data fetching and state management with React Query and Zustand.
-   **User Profiles**: Personal boards and saved pins collection.
-   **Search Functionality**: Find pins by keywords and tags.

## 🛠 Tech Stack

### Client (Frontend)
-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Routing**: [React Router v7](https://reactrouter.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query](https://tanstack.com/query/latest)
-   **Styling**: CSS Modules / Vanilla CSS
-   **Utilities**: Axios, React Toastify, Timeago.js, Emoji Picker React
-   **Image Hosting**: ImageKit

### Backend (API)
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express v5](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
-   **Authentication**: JSON Web Tokens (JWT), Bcryptjs, Cookie-parser
-   **File Handling**: Express-fileupload, Sharp
-   **Image Hosting**: ImageKit

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI and features

## 📂 Project Structure

```
pinterest/
├── backend/              # Express API Server
│   ├── index.js          # Entry point
│   ├── controllers/      # Business logic and route handlers
│   ├── models/           # Mongoose schemas (User, Pin, Board, Comment)
│   ├── routes/           # API route definitions
│   │   ├── user.route.js
│   │   ├── pin.route.js
│   │   ├── board.route.js
│   │   └── comment.route.js
│   ├── middlewares/      # Custom middleware (auth, error handling)
│   ├── utils/            # Helper functions
│   └── .env              # Environment variables (not committed)
│
└── client/               # React Frontend Application
    ├── src/
    │   ├── routes/       # Page components
    │   │   ├── hompage/
    │   │   ├── authPage/
    │   │   ├── profilePage/
    │   │   ├── postPage/
    │   │   ├── createPage/
    │   │   ├── searchPage/
    │   │   └── layouts/
    │   ├── components/   # Reusable UI components
    │   ├── utils/        # Helper functions and utilities
    │   ├── main.jsx      # Application entry point
    │   └── index.css     # Global styles
    ├── public/           # Static assets
    └── .env              # Environment variables (not committed)
```

## ⚡ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed and set up:

-   **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
-   **npm** or **yarn** package manager
-   **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
-   **ImageKit** account - [Sign up here](https://imagekit.io/) for image hosting and optimization

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory with the following variables:
    ```env
    # Server Configuration
    PORT=3000
    
    # Database
    MONGO=mongodb+srv://username:password@cluster.mongodb.net/pinterest
    
    # Authentication
    JWT_SECRET=your_secure_jwt_secret_key_here
    
    # ImageKit Configuration (get from https://imagekit.io/dashboard)
    IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    
    # CORS
    CLIENT_URL=http://localhost:5173
    ```
    
    > **Note**: Keep your `.env` file secure and never commit it to version control. Generate a strong JWT secret using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4.  Start the server:
    ```bash
    npm start
    ```
    The server runs in watch mode using `node --watch`.

### 2. Client Setup

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `client` directory:
    ```env
    # API Configuration
    VITE_API_URL=http://localhost:3000/api
    
    # ImageKit Configuration (same endpoint as backend)
    VITE_URL_IK_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
    ```
    
    > **Note**: Vite only exposes environment variables prefixed with `VITE_` to your client-side code.

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

## 🔌 API Endpoints

### Authentication
-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login user and receive JWT token
-   `POST /api/auth/logout` - Logout user (clear cookies)

### Users
-   `GET /api/users/:id` - Get user profile
-   `PUT /api/users/:id` - Update user profile
-   `GET /api/users/:id/pins` - Get user's pins
-   `GET /api/users/:id/saved` - Get user's saved pins

### Pins
-   `GET /api/pins` - Get all pins (with pagination and filters)
-   `GET /api/pins/:id` - Get single pin details
-   `POST /api/pins` - Create a new pin
-   `PUT /api/pins/:id` - Update pin
-   `DELETE /api/pins/:id` - Delete pin
-   `POST /api/pins/:id/like` - Like/unlike a pin
-   `POST /api/pins/:id/save` - Save/unsave a pin

### Comments
-   `GET /api/comments/:pinId` - Get comments for a pin
-   `POST /api/comments` - Create a comment
-   `DELETE /api/comments/:id` - Delete a comment

### Boards
-   `GET /api/boards` - Get user's boards
-   `POST /api/boards` - Create a new board
-   `PUT /api/boards/:id` - Update board
-   `DELETE /api/boards/:id` - Delete board

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1.  Set up environment variables on your hosting platform
2.  Ensure MongoDB connection string is updated for production
3.  Deploy the backend folder
4.  Update CORS settings to include your frontend URL

### Frontend Deployment (Vercel/Netlify)

1.  Build the client:
    ```bash
    cd client
    npm run build
    ```

2.  Set environment variables:
    -   `VITE_API_URL` - Your production API URL
    -   `VITE_URL_IK_ENDPOINT` - ImageKit endpoint

3.  Deploy the `client` folder to your hosting service

### Docker Deployment (Optional)

Create a `docker-compose.yml` for containerized deployment:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
      
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO=mongodb://mongodb:27017/pinterest
    depends_on:
      - mongodb
      
  client:
    build: ./client
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongo-data:
```

## 🛠️ Troubleshooting

### Common Issues

**Problem**: MongoDB connection fails
-   **Solution**: Check your MongoDB URI in `.env` file. Ensure your IP is whitelisted in MongoDB Atlas if using cloud database.

**Problem**: Images not uploading
-   **Solution**: Verify ImageKit credentials in both backend and client `.env` files. Check ImageKit dashboard for API key status.

**Problem**: CORS errors
-   **Solution**: Ensure `CLIENT_URL` in backend `.env` matches your frontend URL exactly (including protocol and port).

**Problem**: JWT authentication errors
-   **Solution**: Clear browser cookies and localStorage. Ensure JWT_SECRET is set in backend `.env`.

**Problem**: Port already in use
-   **Solution**: Kill the process using the port or change the PORT in `.env`:
    ```bash
    # On Linux/Mac
    lsof -ti:3000 | xargs kill -9
    
    # On Windows
    netstat -ano | findstr :3000
    taskkill /PID <PID> /F
    ```

### Development Tips

-   Use `npm run dev` in client folder for hot reload during development
-   Backend runs in watch mode - changes auto-restart the server
-   Check browser console and terminal for error messages
-   Use MongoDB Compass to inspect your database during development

## 🧪 Testing

```bash
# Run linting
cd client
npm run lint

# Build for production to check for errors
cd client
npm run build
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1.  **Fork the repository**
2.  **Create a feature branch**
    ```bash
    git checkout -b feature/amazing-feature
    ```
3.  **Commit your changes**
    ```bash
    git commit -m 'Add some amazing feature'
    ```
4.  **Push to the branch**
    ```bash
    git push origin feature/amazing-feature
    ```
5.  **Open a Pull Request**

### Contribution Guidelines

-   Follow the existing code style and conventions
-   Write clear commit messages
-   Test your changes thoroughly
-   Update documentation as needed
-   Ensure your code passes linting checks

## 📝 Roadmap

Future enhancements planned:

-   [ ] Real-time notifications
-   [ ] Direct messaging between users
-   [ ] Advanced search filters
-   [ ] Pin recommendations based on user interests
-   [ ] Social sharing to external platforms
-   [ ] Dark mode theme
-   [ ] Mobile app (React Native)

## 👥 Authors

-   **Hassan Said** - [HassanSaid21](https://github.com/HassanSaid21)

## 🙏 Acknowledgments

-   Inspired by [Pinterest](https://www.pinterest.com/)
-   Built with amazing open-source tools and libraries
-   Thanks to the MERN stack community

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details or visit [MIT License](https://choosealicense.com/licenses/mit/)

## 📞 Support

If you have any questions or need help, please:
-   Open an issue in the repository
-   Check the troubleshooting section above
-   Review closed issues for similar problems

---

**⭐ If you found this project helpful, please consider giving it a star!**
