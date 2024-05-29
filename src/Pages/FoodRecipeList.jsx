import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Category from './Category';
import { fetchRecipes } from '../service/ApiRecipes';
const FoodRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByReview, setSortByReview] = useState(false);

  useEffect(() => {
      const getRecipes = async () => {
          try {
              const data = await fetchRecipes();
              setRecipes(data);
          } catch (error) {
              console.error('Error fetching recipes:', error);
          }
      };

      getRecipes();
  }, []);

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const handleCategorySubmit = (category) => {
      setFilterCategory(category);
      console.log(category);
  };

  const handleBestReviewedClick = () => {
      setSortByReview((prevSortByReview) => !prevSortByReview);
  };

  const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory ? recipe.category.toLowerCase() === filterCategory.toLowerCase() : true)
  );

  if (sortByReview) {
      filteredRecipes.sort((a, b) => b.review - a.review);
  }

  return (
      <div className='container-recipes'>
          <div className='recipes-header'>
              <h2>All Recipes</h2>
              <input
                  type="text"
                  className='searchBar'
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={handleSearchChange}
              />
          </div>
          <div className='filter-recipes'>
              <h3>Filter:</h3>
              <Category onSubmitCategory={handleCategorySubmit} />
              <p onClick={handleBestReviewedClick}>Best Reviewed</p>
          </div>
          <div className='recipes-list'>
              {filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className='recipe-item'>
                      <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '200px' }} />
                      <div className='recipe-details'>
                          <h3>{recipe.title}</h3>
                          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                          <p><strong>Instructions:</strong> {recipe.instructions}</p>
                          <p><strong>Category:</strong> {recipe.category}</p>
                          <p><strong>Rating:</strong> {recipe.review}</p>
                      </div>
                  </div>
              ))}
          </div>
          <Outlet />
      </div>
  );
};

export default FoodRecipeList;