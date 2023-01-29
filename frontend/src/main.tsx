import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "reset.css";
import "virtual:uno.css";
import { lazy, Suspense } from "react";
const MainPage = lazy(() => import("./features/main-page/MainPage.component"));
const BlogRoute = lazy(() => import("./routes/Blog.route"));
const AuthPageRoute = lazy(() => import("./routes/AuthPage.route"));
const DashboardRoute = lazy(() => import("./routes/DashboardPage.route"));
const BlogsRoute = lazy(() => import("./routes/Blogs.route"));
import { Provider } from "react-redux";
import { store } from "./app/store";
import Ghost from "./features/shared/Ghost.component";
import "./main.css";
import PageNotExist from "./routes/404.route";
import Root from "./features/shared/Root.component";
import Loading from "./features/shared/Loading.component";
import UserRoute from "./routes/UserRoute";

const router = createBrowserRouter([
  {
    // universal 404 page
    errorElement: <PageNotExist />,
    // all routes
    children: [
      {
        path: "/",
        element: (
          <Root>
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          </Root>
        ),
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<Loading />}>
            <AuthPageRoute />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Root>
            <Suspense fallback={<Loading />}>
              <DashboardRoute />
            </Suspense>
          </Root>
        ),
      },
      {
        path: "/user/:userId",
        element: (
          <Root>
            <Suspense fallback={<Loading />}>
              <UserRoute />
            </Suspense>
          </Root>
        ),
      },
      {
        path: "/blogs",
        element: (
          <Root>
            <Suspense fallback={<Loading />}>
              <BlogsRoute />
            </Suspense>
          </Root>
        ),
      },
      {
        path: "/blogs/:blogId",
        element: (
          <Root>
            <Suspense fallback={<Loading />}>
              <BlogRoute />
            </Suspense>
          </Root>
        ),
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
