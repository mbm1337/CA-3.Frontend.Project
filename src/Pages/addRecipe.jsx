import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ setUpdated, updated }) => {
  const initialRecipe = {
    title: '',
    category: '',
    ingredients: '',
    instructions: '',
    imageURL: '',
  };

  const [recipe, setRecipe] = useState(initialRecipe);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [fileLabel, setFileLabel] = useState('No file chosen');
  const navigate = useNavigate();

  useEffect(() => {
    // Any initial setup can go here if needed
  }, []);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImageURL(URL.createObjectURL(file));
    setFileLabel(file ? file.name : 'No file chosen');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title: recipe.title,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      imageURL: imageURL, // Directly using imageURL from state
    };

    try {
      const response = await fetch('http://localhost:3002/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
  };

  return (
    <div className="container-add-recipe">
      <form onSubmit={handleSubmit}>
      <h2>Recipe Add</h2>
        <div className="form-group">
          <label>Recipe Title:</label>
          <input
            type="text"
            value={recipe.title}
            id="title"
            placeholder="Enter recipe title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe category:</label>
          <input
            type="text"
            value={recipe.category}
            id="category"
            placeholder="Enter category"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe ingredients:</label>
          <textarea
            value={recipe.ingredients}
            id="ingredients"
            placeholder="Enter ingredients"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe instructions:</label>
          <textarea
            value={recipe.instructions}
            id="instructions"
            placeholder="Enter instructions"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe Image:</label>
          <input type="file" onChange={handleFileChange} required />
          {imageURL && (
            <img
              src={imageURL}
              alt="Selected"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit" className="add-btn">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
