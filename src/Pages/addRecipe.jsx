import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ setUpdated, updated ,isloggedin}) => {//if user is logged in add shoulkd appear
    const initialRecipe = {
        title: '',
        ingredients: '',
        instructions: '',
        imageURL: '',
    };

    const [recipe, setRecipe] = useState(initialRecipe);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setRecipe({ ...recipe, [e.target.id]: e.target.value });
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setFile(file);
        setImageURL(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        const recipeData = {
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
        };

        try {
            const response =  fetch("http://localhost:3002/recipes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            const data = await response.json();
            console.log(data);
            setUpdated(!updated);
            setRecipe(initialRecipe);
            navigate('/food-recipe');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={recipe.title} 
                    id="title" 
                    placeholder="Enter recipe title" 
                    onChange={handleChange}
                    required
                />
                 <input 
                    type="text" 
                    value={recipe.category} 
                    id="category" 
                    placeholder="Enter category" 
                    onChange={handleChange}
                    required
                />
                <textarea 
                    value={recipe.ingredients} 
                    id="ingredients" 
                    placeholder="Enter ingredients" 
                    onChange={handleChange}
                    required
                />
                <textarea 
                    value={recipe.instructions} 
                    id="instructions" 
                    placeholder="Enter instructions" 
                    onChange={handleChange}
                    required
                />
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    required
                />
                {imageURL && <img src={imageURL} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                <button type="submit">Add Recipe</button>
            </form>
        </>
    );
};

export default AddRecipe;
