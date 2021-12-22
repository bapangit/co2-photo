import { Navigate } from "react-router";

export default function ProtectedRoute ({auth,requiredComponent}){
    return auth? requiredComponent:<Navigate to="/login"/>
}