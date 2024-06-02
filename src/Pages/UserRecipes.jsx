import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_DEV } from "../Utils/globalvariables";
import { fetchRecipeByEmail,deleteRecipe } from '../service/ApiRecipes';


const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipes = async () => {
            const email = localStorage.getItem('username');
            if (email) {
                const data = await fetchRecipeByEmail(email);
                setRecipes(data);
            }
        };

        getRecipes();
    }, []);

    const handleDelete = async (id) => {
        const isSuccess = await deleteRecipe(id);
        if (isSuccess) {
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`);
    };

    return (
        <div>
            <h2>My Recipes</h2>
            <ul>
                {Array.isArray(recipes) && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <h3>{recipe.name}</h3>
                            <img src={`${BASE_URL_DEV}/recipe/images/${recipe.imageUrl}`} alt={recipe.name} style={{ maxWidth: '200px' }} />
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Category:</strong> {recipe.category}</p>
                            <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>You have not created any recipes yet.</p>
                )}
            </ul>
        </div>
    );
};

export default UserRecipes;
