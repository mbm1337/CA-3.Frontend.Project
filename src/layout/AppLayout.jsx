import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

const Applayout = ({currentUser}) => {
    return (
    <>
      <Header currentUser={currentUser}/>
      <Outlet/>
    </>
    )
  }

  export default Applayout;