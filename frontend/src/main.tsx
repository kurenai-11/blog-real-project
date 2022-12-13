import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import RootRoute from "./routes/Root.route";
import AuthPageRoute from "./routes/AuthPage.route";
import { Provider } from "react-redux";
import { store } from "./app/store";
import DashboardRoute from "./routes/DashboardPage.route";
// import { CookiesProvider } from "react-cookie";
import Ghost from "./features/shared/Ghost.component";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <CookiesProvider> */}
    <Provider store={store}>
      <Ghost />
      <RouterProvider router={router} />
    </Provider>
    {/* </CookiesProvider> */}
  </React.StrictMode>
);
