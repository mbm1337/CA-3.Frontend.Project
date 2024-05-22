import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const FoodRecipeList = () => {
    const [recipes, setRecipes] = useState([]);

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

    return (
        <div>
            <h2>Recipes</h2>
            <nav>
                <ul>
                    <li><NavLink to="/categories">Categories</NavLink></li>
                    <li><NavLink to="/reviews">Reviews</NavLink></li>
                    <li><NavLink to="/recipes">Recipes</NavLink></li>
                </ul>
            </nav>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.imageURL} alt={recipe.title} style={{ maxWidth: '200px' }} />
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodRecipeList;
