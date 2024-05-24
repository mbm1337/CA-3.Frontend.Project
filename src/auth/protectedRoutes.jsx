import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function ProtectedRoute({isLoggedIn, children}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if(isLoggedIn) return <>{children}</>;
}