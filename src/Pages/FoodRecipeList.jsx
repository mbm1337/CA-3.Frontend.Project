import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Category from './Category';

const FoodRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        // Fetch recipes from the server
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
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterCategory ? recipe.category.toLowerCase() === filterCategory.toLowerCase() : true)
    );

    return (
        <div>
            <h2>Recipes</h2>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <nav>
                <ul>
                    <Category onSubmitCategory={handleCategorySubmit} />
                    <li><NavLink to="/reviews">Reviews</NavLink></li>
                    <li><NavLink to="/food-recipe">Recipes</NavLink></li>
                </ul>
            </nav>

            <ul>
                {filteredRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '200px' }} />
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <p><strong>Category:</strong> {recipe.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodRecipeList;
