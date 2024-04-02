import React from "react";
import { Navigate } from "react-router-dom";

// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard-saas/index";
import Income from "../pages/Income/index";
import Revenue from "../pages/Revenue/index";
import Expenses from "../pages/Expenses/index";
import Add from "../pages/Income/add";
import Login2 from "../pages/Authentication/Login2";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  //   // //profile
  { path: "/profile", component: <UserProfile /> },

  { path: "/revenue", component: <Revenue />},
  { path: "/income", component: <Income />},
  { path: "/expense", component: <Expenses />},
  { path: "/add", component: <Add />},

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login2 /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };