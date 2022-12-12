import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import Root from "./routes/Root.route";
import MainPage from "./routes/MainPage.route";
import AuthPageRoute from "./routes/AuthPage.route";
import { action as loginAction } from "./features/auth-page/LoginForm.component";
import { action as signupAction } from "./features/auth-page/SignupForm.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPageRoute />,
    // we will do error handling on our own
    errorElement: <></>,
    children: [
      {
        path: "/auth/login",
        action: loginAction,
        element: <></>,
      },
      {
        path: "/auth/signup",
        action: signupAction,
        element: <></>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
