import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import RootRoute from "./routes/Root.route";
import AuthPageRoute from "./routes/AuthPage.route";
import DashboardRoute from "./routes/DashboardPage.route";
import BlogsRoute from "./routes/Blogs.route";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Ghost from "./features/shared/Ghost.component";
import "./main.css";
import BlogRoute from "./routes/Blog.route";
import PageNotExist from "./routes/404.route";

const router = createBrowserRouter([
  {
    // universal 404 page
    errorElement: <PageNotExist />,
    // all routes
    children: [
      {
        path: "/",
        element: <RootRoute />,
      },
      {
        path: "/auth",
        element: <AuthPageRoute />,
      },
      {
        path: "/dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "/blogs",
        element: <BlogsRoute />,
      },
      {
        path: "/blogs/:blogId",
        element: <BlogRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Ghost />
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
