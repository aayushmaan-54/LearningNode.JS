import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Layout from "../components/Layout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import CodeLogin from "../pages/auth/CodeLogin";
import Profile from "../pages/profile/Profile";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ChangePassword from "../pages/changePassword/ChangePassword";
import UsersList from "../pages/usersList/UsersList";
import Error404 from "../pages/Error404";


export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:resetToken", element: <ResetPassword /> },
      { path: "/loginWithCode/:email", element: <CodeLogin /> },
      { path: "/profile", element: <Profile /> },
      { path: "/verify/:verificationToken", element: <VerifyAccount /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/users", element: <UsersList /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);