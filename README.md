# Full Stack Pinterest Clone

A full-stack social media application inspired by Pinterest, built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to create, share, and interact with visual content ("pins").

## 🚀 Features

-   **User Authentication**: Secure login and registration using JWT and HTTP-only cookies.
-   **Pin Management**: Create, view, delete, and save pins.
-   **Interactions**: Like, save, and comment on pins.
-   **Image Upload**: Seamless image uploading and optimization using ImageKit and Sharp.
-   **Responsive Design**: Modern UI built with React and CSS.
-   **Infinite Scroll**: Smooth browsing experience.
-   **State Management**: efficient data fetching and state management with React Query and Zustand.

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

## 📂 Project Structure

```
root/
├── backend/          # Express API
│   ├── index.js      # Entry point
│   ├── controllers/  # Route logic
│   ├── models/       # Mongoose schemas
│   └── ...
└── client/           # React Frontend
    ├── src/
    │   ├── components/
    │   ├── routes/
    │   └── ...
    └── ...
```

## ⚡ Getting Started

### Prerequisites
-   Node.js installed
-   MongoDB instance (local or Atlas)
-   ImageKit account for image hosting

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory and add the following variables (adjust as needed):
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    CLIENT_URL=http://localhost:5173
    ```

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

3.  Create a `.env` or `.env.local` file in the `client` directory:
    ```env
    VITE_API_URL=http://localhost:3000/api
    VITE_URL_IK_ENDPOINT=your_imagekit_url_endpoint
    # Add other Vite env variables as required
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
