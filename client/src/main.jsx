import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import MainLayout from "./routes/layouts/MainLayout.jsx";
import Homepage from "./routes/hompage/Homepage.jsx";
import CreatePage from "./routes/createPage/CreatePage.jsx";
import AuthPage from "./routes/authpage/AuthPage.jsx";
import PostPage from "./routes/postpage/Postpage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage.jsx";
import SearchPage from "./routes/searchPage/searchPage.jsx";
import { ImageKitProvider } from "@imagekit/react";
import  {QueryClient , QueryClientProvider} from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: Homepage },
       { path: "/create", Component: CreatePage },
      { path: "/pin/:id", Component: PostPage },
      { path: "/:username", Component: ProfilePage },
      { path: "/search", Component: SearchPage },
    ],
  },
  {
    path: "auth",
    Component: AuthPage,
    // children: [
    //   { path: "login", Component: Login },
    //   { path: "register", Component: Register },
    // ],
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
  </StrictMode>
);
