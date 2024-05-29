import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../service/ApiRecipes';
const AddRecipe = ({ setUpdated, updated,isloggedin }) => {
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

    try {
      const data = await addRecipe(recipe.name, recipe.category, recipe.ingredients, recipe.instructions, imageURL);
      console.log('Recipe added successfully:', data);
      setUpdated(!updated);
      setRecipe(initialRecipe);
      navigate('/food-recipe');
    } catch (error) {
      console.error('Error adding recipe:', error);
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
            value={recipe.name}
            id="title"
            placeholder="Enter recipe title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe Category:</label>
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
          <label>Recipe Ingredients:</label>
          <textarea
            value={recipe.ingredients}
            id="ingredients"
            placeholder="Enter ingredients"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe Instructions:</label>
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
