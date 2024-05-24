import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Login from './auth/Login';
import FoodRecipeList from './Pages/FoodRecipeList';
import Register from './auth/Register';
import NavigationBar from './layout/NavBar';
import Logout from './auth/Logout';
import AddRecipe from './Pages/addRecipe';
import Home from './layout/home';
import Reviews from './Pages/Reviews';

function App() {
  const [user, setUser] = useState([]); //array da jeg får token og mail
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
      setUser([]);
      setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>

          <Route path = "/" element ={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addrecipe" element={<AddRecipe />} />

          <Route path="/food-recipe" element={<FoodRecipeList />}>
          <Route path="/reviews" element={<Reviews />} />

            


  </Route>
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;