import { useAuth } from "@/hooks"
import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth: FC = () => {
  const { auth } = useAuth()
  const location = useLocation()
  
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
