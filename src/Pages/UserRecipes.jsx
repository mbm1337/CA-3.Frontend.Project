import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_DEV } from "../Utils/globalvariables";

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const email = localStorage.getItem('username');
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${BASE_URL_DEV}/recipe/personal/${email}`, {
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
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL_DEV}/recipe/${localStorage.getItem('username')}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(id) 
            });
    
            if (response.ok) {
                
                setRecipes(recipes.filter(recipe => recipe.id !== id));
            } else {
                console.error('Error deleting recipe:', await response.text());
            }
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
                        <h3>{recipe.name}</h3>
                        <img src={recipe.imageUrl} alt={recipe.name} style={{ maxWidth: '200px' }} />
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
