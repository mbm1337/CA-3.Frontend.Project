import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost:3002/user/recipes", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3002/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`);
    };

    return (
        <div>
            <h2>My Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.imageURL} alt={recipe.title} style={{ maxWidth: '200px' }} />
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <p><strong>Category:</strong> {recipe.category}</p>
                        <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRecipes;