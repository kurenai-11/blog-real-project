import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import Root from "./routes/Root.route";
import MainPage from "./routes/MainPage.route";
import AuthPageRoute from "./routes/AuthPage.route";
import { action as loginAction } from "./features/auth-page/LoginForm.component";

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
  },
  {
    path: "/auth/login",
    action: loginAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
