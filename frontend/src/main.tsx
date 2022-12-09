import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import Root from "./routes/Root.route";
import MainPage from "./routes/MainPage.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/auth",
        element: <div>Auth page</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
