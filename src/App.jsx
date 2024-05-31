import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './auth/Login';
import FoodRecipeList from './Pages/FoodRecipeList';
import Register from './auth/Register';
import NavigationBar from './layout/NavBar';
import AddRecipe from './Pages/addRecipe';
import Home from './layout/home';
import EditRecipe from './Pages/EditRecipe';
import UserRecipes from './Pages/UserRecipes';
import AdminPanel from './Pages/AdminPanel';
import Logout from './auth/Logout';
import ProtectedRoute from './auth/protectedRoutes';
import "./App.css";
import PublicRoutes from './Pages/PublicRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <Router>
      <div>
        <NavigationBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoutes isAuthenticated={isAuthenticated} component={<Login setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/signup" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/add-recipe" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<AddRecipe />} />} />
          <Route path="/my-recipes" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<UserRecipes />} />} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<EditRecipe />} />} />
          <Route path="/food-recipe" element={<FoodRecipeList />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<AdminPanel />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
