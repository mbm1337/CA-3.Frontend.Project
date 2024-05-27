import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = ({ setUpdated, updated }) => {
  const initialRecipe = {
    title: "",
    category: "", // Added category field
    ingredients: "",
    instructions: "",
  };

  const [recipe, setRecipe] = useState(initialRecipe);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
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

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("category", recipe.category); // Append category field
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("image", file); // Append file data

    try {
      const response = await fetch("http://localhost:3002/recipes", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setUpdated(!updated);
      setRecipe(initialRecipe);
      navigate("/food-recipe");
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
