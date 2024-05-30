import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

//this page is to track if the user is logged in, if he is logged in he ccant login again or signup
export default function PublicRoutes({isAuthenticated, component}) {
    const navigate = useNavigate();

    useEffect(() => {
        //if user is logged in he must no go to login in page it will navigate him to home 
        
        if (isAuthenticated) {
            navigate('/');
        }
    }, []);//

    if(!isAuthenticated || isAuthenticated == undefined)  return <>{component}</>;
}