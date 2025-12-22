import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store => store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;
}

// if you have already logged in then can't log in again
export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store => store.auth);

    if(isAuthenticated){
        return <Navigate to="/" />
    }

    return children;
}

// if the role is not instructor then can't route instructor externally by anyone
export const AdminRoute = ({children}) => {
    const {user, isAuthenticated } = useSelector(store => store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    if(user?.role !== "instructor"){
        return <Navigate to="/" />
    }

    return children;
}