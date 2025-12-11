# Pinterest Clone - Frontend

React 19 application built with Vite, featuring a modern UI for the Pinterest clone.

## 🛠 Tech Stack

-   **React 19** - Latest React with improved concurrent features
-   **Vite** - Lightning-fast build tool and dev server
-   **React Router v7** - Modern routing for React applications
-   **TanStack Query** - Powerful data fetching and caching
-   **Zustand** - Lightweight state management
-   **ImageKit React** - Image optimization and CDN
-   **Axios** - HTTP client
-   **React Toastify** - Toast notifications
-   **Emoji Picker React** - Emoji support in comments

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in this `client` directory. Vite only exposes variables prefixed with `VITE_`.

Required variables:

```env
# Backend API endpoint
VITE_API_URL=http://localhost:3000/api

# ImageKit configuration (for image uploads)
VITE_URL_IK_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── routes/              # Page components
│   ├── hompage/        # Home page with pin feed
│   ├── authPage/       # Login/Register pages
│   ├── profilePage/    # User profile and boards
│   ├── postPage/       # Single pin view with comments
│   ├── createPage/     # Create new pin
│   ├── searchPage/     # Search functionality
│   └── layouts/        # Layout wrappers
├── components/         # Reusable UI components
├── utils/             # Helper functions and utilities
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔌 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🎨 Features

-   Responsive design for all screen sizes
-   Infinite scroll for pin feeds
-   Image upload with drag & drop
-   Real-time toast notifications
-   Optimistic UI updates
-   Client-side routing with React Router
-   Efficient state management and caching
-   Image optimization via ImageKit CDN

## 📚 Key Dependencies

-   `react` & `react-dom` - React library
-   `react-router` - Routing
-   `@tanstack/react-query` - Server state management
-   `zustand` - Client state management
-   `axios` - HTTP requests
-   `@imagekit/react` - Image optimization
-   `react-toastify` - Notifications
-   `react-infinite-scroll-component` - Infinite scrolling
-   `emoji-picker-react` - Emoji picker
-   `timeago.js` - Time formatting

## 🔧 Configuration

This project uses:

-   **@vitejs/plugin-react** - Uses Babel for Fast Refresh
-   **ESLint 9** - With React plugins for code quality
-   **Vite 6** - Latest build tool features

Vite configuration can be found in `vite.config.js`  
ESLint configuration in `eslint.config.js`

## 📝 Notes

-   The app expects the backend API to be running on `http://localhost:3000` by default
-   Images are served and optimized through ImageKit CDN
-   Authentication uses HTTP-only cookies for security
-   State is managed efficiently with React Query caching strategies

For more information, see the main [project README](../README.md).
