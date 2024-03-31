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
import Dashboard from "../pages/Dashboard/index";
import Income from "../pages/Income/index";
import Expenses from "../pages/Expenses/index";
import AllSummary from "../pages/AllSummary/index";
import Notes from "../pages/Notes/index";
import Add from "../pages/Income/add";

const authProtectedRoutes = [
  { path: "/", component: <Dashboard /> },

  //   // //profile
  { path: "/profile", component: <UserProfile /> },

  { path: "/income", component: <Income />},
  { path: "/expense", component: <Expenses />},
  { path: "/allSummary", component: <AllSummary />},
  { path: "/note", component: <Notes />},

  { path: "/add", component: <Add />},

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
