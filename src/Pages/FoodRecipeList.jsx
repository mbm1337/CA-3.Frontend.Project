import React, { useState, useEffect } from 'react';
import { Outlet,useNavigate} from 'react-router-dom';
import Category from './Category';
import { fetchRecipes } from '../service/ApiRecipes';
import { BASE_URL_DEV } from "../Utils/globalvariables";
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
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory ? recipe.category.toLowerCase() === filterCategory.toLowerCase() : true)
  );

  if (sortByReview) {
      filteredRecipes.sort((a, b) => b.review - a.review);
  }

  const navigate = useNavigate();

  const handleById = (id) => {
    navigate(`/recipes/${id}`);
};

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
             <div key={recipe.id} className='recipe-item' onClick={() => handleById(recipe.id)}>
             <img src={`${BASE_URL_DEV}/recipe/images/${recipe.imageUrl}`} alt={recipe.name} style={{ maxWidth: '200px' }} />
             <div className='recipe-details'>
                 <h3>{recipe.name}</h3>
                 <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                 <p><strong>Instructions:</strong> {recipe.instructions}</p>
                 <p><strong>Category:</strong> {recipe.category}</p>
             </div>
         </div>
              ))}
          </div>
          <Outlet />
      </div>
  );
};

export default FoodRecipeList;