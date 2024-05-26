import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Category from './Category';

const FoodRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByReview, setSortByReview] = useState(false);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3002/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategorySubmit = (category) => {
    setFilterCategory(category);
    console.log(category)
  };
  //this function, i fetch data first then i filter them ,but the data will appear since 
  //we call recipes, it filters accordingly to input, same tim ecategory and sort.

  
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory ? recipe.category.toLowerCase() === filterCategory.toLowerCase() : true)
  );
  
const handleBestReviewedClick = () => {
    setSortByReview((prevSortByReview) => !prevSortByReview);
  };

  if (sortByReview) {
    filteredRecipes.sort((a, b) => b.review - a.review);
  }



  

  return (
    <div className='container-recipes'>
        <div className='recipes-header'>
      <h2> All Recipes</h2>
      <input
        type="text" className='searchBar'
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </div>
        <div className='filter-recipes'>
          <h3>Filter:</h3>  
          <Category onSubmitCategory={handleCategorySubmit} />
          <p onClick = {handleBestReviewedClick}>bestReviewed</p>
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
            <p><strong>RATING:</strong> {recipe.review}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <ul>
        {filterReviews.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '200px' }} />
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
          </li>
        ))}
      </ul> */}
      <Outlet/>
''    </div>
  );
};

export default FoodRecipeList;
