import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import MainLayout from "./routes/layouts/MainLayout.jsx";
import { ImageKitProvider } from "@imagekit/react";
import  {QueryClient , QueryClientProvider} from '@tanstack/react-query'

const Homepage = lazy(() => import("./routes/hompage/Homepage.jsx"));
const CreatePage = lazy(() => import("./routes/createPage/CreatePage.jsx"));
const PostPage = lazy(() => import("./routes/postPage/PostPage.jsx"));
const ProfilePage = lazy(() => import("./routes/profilePage/ProfilePage.jsx"));
const SearchPage = lazy(() => import("./routes/searchPage/searchPage.jsx"));
const AuthPage = lazy(() => import("./routes/authPage/AuthPage.jsx"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage.jsx"));
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: Homepage },
       { path: "/create", Component: CreatePage },
      { path: "/pins/:id", Component: PostPage },
      { path: "/:username", Component: ProfilePage  },
      { path: "/search", Component: SearchPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
]);
const URL = import.meta.env.VITE_URL_IK_ENDPOINT;
const queryClient =  new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ImageKitProvider urlEndpoint={URL}>
      <RouterProvider router={router} />
    </ImageKitProvider>
    </QueryClientProvider>
    <ToastContainer position="top-center" autoClose={3000}  />
  </StrictMode>
);
