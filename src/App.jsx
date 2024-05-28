import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link ,Outlet} from 'react-router-dom';

import Login from './auth/Login';
import FoodRecipeList from './Pages/FoodRecipeList';
import Register from './auth/Register';
import NavigationBar from './layout/NavBar';
import AddRecipe from './Pages/addRecipe';
import Home from './layout/home';
import EditRecipe from './Pages/EditRecipe';
import UserRecipes from './Pages/UserRecipes';
import Reviews from './Pages/Reviews';
import "./App.css"

function App() {
  const [user, setUser] = useState([]);
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/food-recipe" element={<FoodRecipeList />}>
          <Route path="edit-recipe/:id" element={<EditRecipe />} />
          <Route path="my-recipes" element={<UserRecipes />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
