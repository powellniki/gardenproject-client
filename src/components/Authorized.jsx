import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar.jsx"


export const Authorized = () => {
  if (localStorage.getItem("token")) {
    return <>
      <NavBar />
      <main className="">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
