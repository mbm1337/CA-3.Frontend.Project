import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Login from './auth/Login';
import FoodRecipeList from './Pages/FoodRecipeList';
import Register from './auth/Register';
import NavigationBar from './layout/NavBar';
import Logout from './auth/Logout';
import AddRecipe from './Pages/addRecipe';

function App() {


  const handleLogout = () => {
      setUser([]);
      setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/food-recipe" element={<FoodRecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;