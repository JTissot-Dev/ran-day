import { Navigate, createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./Layout/DefaultLayout"
import GuestLayout from "./Layout/GuestLayout"
import Home from "./views/Home"
import Login from "./views/Login"
import Signup from "./views/Signup"
import Account from "./views/Account"
import Program from "./views/Program"


const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/index" />
      },
      {
        path: "/index",
        element: <Home />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/program",
        element: <Program />
      }
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  }
])

export default router