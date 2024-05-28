import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

//this page is to track if the user is logged in, if he is logged in he ccant login again or signup
export function ProtectedRoute({isAuthenticated, component}) {
    const navigate = useNavigate();

     //routes that you dont want the user to see unless if he is logged in
     // renders one time,but in dependency and if the variable logged in changed it will render again
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);//

    if(isAuthenticated) return <>{componenet}</>;
}