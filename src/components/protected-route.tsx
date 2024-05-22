import { Navigate, Outlet } from "react-router-dom"

interface Props {
    isAuthenticated: boolean
}

const ProtectedRoute = ({isAuthenticated}: Props) => {

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
      }
    
      return <Outlet />;
}

export default ProtectedRoute;