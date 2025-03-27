import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userRole } from "../context/RoleContext";

export const ProtectedAdminRoute = ({children})=>{
const {currentUser, authLoading} = useAuth;
const {isAdmin, roleLoading} = userRole;

const location = useLocation();

if (authLoading || roleLoading){
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
}

if (!currentUser){
    return <Navigate to="/" state={{from: location}} replace />
}

if (!isAdmin){
    return <Navidate to="/" replace/>
}
}