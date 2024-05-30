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
import ProtectedRoute from './auth/ProtectedRoutes';
import "./App.css";
import PublicRoutes from './Pages/PublicRoutes';

function App() {
  //isAuthenticated is being extracted from local storage we connot set it to false otherwise i will logout autmatically
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });  const handleLogout = () => {

    setIsAuthenticated(false);
  };
  

  return (
    <Router>
      <div>
        <NavigationBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoutes isAuthenticated={isAuthenticated} component={<Login />}></PublicRoutes>} />
          <Route path="/signup" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/add-recipe" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<AddRecipe />}></ProtectedRoute>} />
          <Route path="/my-recipes" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<UserRecipes />}></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={<EditRecipe />}></ProtectedRoute>} />
          <Route path="/food-recipe" element={<FoodRecipeList />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
