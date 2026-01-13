import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";
import MyAcceptedJobs from "../pages/MyAcceptedJobs";
import UpdateJob from "../pages/UpdateJob";
import CategoryJobs from "../pages/CategoryJobs";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import EnhancedJobDetails from "../pages/EnhancedJobDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";

// Dashboard imports
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ProfilePage from "../pages/dashboard/ProfilePage";
import AdminUsers from "../pages/dashboard/admin/AdminUsers";
import AdminJobs from "../pages/dashboard/admin/AdminJobs";
import AdminReports from "../pages/dashboard/admin/AdminReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allJobs",
        element: <AllJobs />,
      },
      {
        path: "/category/:category",
        element: <CategoryJobs />,
      },
      {
        path: "/job/:id",
        element: <EnhancedJobDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // PRIVATE ROUTES START HERE
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/myAddedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-accepted-tasks",
        element: (
          <PrivateRoute>
            <MyAcceptedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateJob/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
    ],
  },
  // DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // User Dashboard Routes
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "my-jobs",
        element: <MyPostedJobs />,
      },
      {
        path: "my-tasks",
        element: <MyAcceptedJobs />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "update-job/:id",
        element: <UpdateJob />,
      },
      // Admin Dashboard Routes
      {
        path: "admin",
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminDashboard />
          </RoleBasedRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminUsers />
          </RoleBasedRoute>
        ),
      },
      {
        path: "admin/jobs",
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminJobs />
          </RoleBasedRoute>
        ),
      },
      {
        path: "admin/reports",
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminReports />
          </RoleBasedRoute>
        ),
      },
    ],
  },
]);

export default router;
