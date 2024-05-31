import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../service/ApiRecipes';
import Category from './Category';
import axios from 'axios'; // Make sure to install axios

const AddRecipe = () => {
  const [updated, setUpdated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const initialRecipe = {
    name: '',
    category: '',
    ingredients: '',
    instructions: '',
    imageUrl: '',
  };

  const [recipe, setRecipe] = useState(initialRecipe);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageURL] = useState('');
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
  
    // Get the file name
    const fileName = file.name;
    recipe.fileName = fileName; // Store the file name in the recipe object
    console.log('File name:', fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipe.category) {
      setErrorMessage('Please select a category');
      return;
    }

try {
  const email = localStorage.getItem('username');
  const token = localStorage.getItem('token'); // get the token from local storage

  // Upload the file
  const formData = new FormData();
  formData.append('image', file, file.name); // changed 'myFile' to 'image'
  const uploadResponse = await axios.post('http://localhost:7000/api/recipe/upload', formData, {
    headers: {
      'Authorization': `Bearer ${token}` // include the token in the Authorization header
    },
    onUploadProgress: progressEvent => {
      console.log(progressEvent.loaded / progressEvent.total);
    }
  });

  // If the file is uploaded successfully, the server should return the URL of the uploaded file
  if (uploadResponse.status === 200) {
    const generatedFileName = uploadResponse.data.fileName; // Get the generated file name from the response
    recipe.imageUrl = generatedFileName; // Store the generated file name as imageUrl
  }


      const data = await addRecipe(
        recipe.name,
        recipe.category,
        recipe.ingredients,
        recipe.instructions,
        recipe.imageUrl,
        email 
      );
      console.log('Recipe added successfully:', data);
      
      setUpdated(!updated);
      setRecipe(initialRecipe);
      navigate('/food-recipe');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setRecipe({ ...recipe, category });
    setErrorMessage('');
  };

  return (
    <div className="container-add-recipe">
      <form onSubmit={handleSubmit}>
        <h2>Recipe Add</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className="form-group">
          <label>Recipe Title:</label>
          <input
            type="text"
            value={recipe.name}
            id="name"
            placeholder="Enter recipe title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe category:</label>
          <Category onSubmitCategory={handleCategoryChange} />
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
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt="Selected"
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
              <p>Image URL: {fileLabel}</p>
            </div>
          )}
        </div>
        <button type="submit" className="add-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
