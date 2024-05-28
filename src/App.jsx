import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link ,Outlet} from 'react-router-dom';

import Login from './auth/Login';
import FoodRecipeList from './Pages/FoodRecipeList';
import Register from './auth/Register';
import NavigationBar from './layout/NavBar';
import AddRecipe from './Pages/AddRecipe';
import Home from './layout/home';
import EditRecipe from './Pages/EditRecipe';
import UserRecipes from './Pages/UserRecipes';
import "./App.css"

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(() => {
  //   return localStorage.getItem('token') ? true : false;
    
  // });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
      <div>
        <NavigationBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login"  element={<Login setIsAuthenticated={setIsAuthenticated}  />} />
          <Route path="/signup" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/my-recipes" element={<UserRecipes />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/food-recipe" element={<FoodRecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;