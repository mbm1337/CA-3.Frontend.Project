import React, { useEffect, useState } from 'react';
import { getAllRecipes, getCommentsForRecipe, deleteComment, deleteRecipe } from '../service/adminapi';

export default function RecipeComments() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedRecipeId) {
        const comments = await getCommentsForRecipe(selectedRecipeId);
        setComments(comments);
      }
    };
    fetchComments();
  }, [selectedRecipeId]);

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(prevId => prevId === id ? null : id);
  };

  const handleRecipeDelete = async (recipeId) => {
    await deleteRecipe(recipeId);
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    // Hvis den slettede opskrift var den valgte, fjern valget
    if (selectedRecipeId === recipeId) {
      setSelectedRecipeId(null);
      setComments([]); // Ryd kommentarer
    }
  };

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="recipe-comments-container">
      <h2 className="center">Select a recipe to view comments</h2>
      <div className="recipe-list center">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-item">
            <button onClick={() => handleRecipeSelect(recipe.id)} className="recipe-btn">
              {recipe.name}
            </button>
            <button onClick={() => handleRecipeDelete(recipe.id)} className="delete-btn">
              Delete Recipe
            </button>
            {selectedRecipeId === recipe.id && (
              <div className="comment-list">
                {Array.isArray(comments) && comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <p className="comment-text">{comment.text}</p>
                    <p className="comment-user">Posted by: {comment.userEmail}</p>
                    <button onClick={() => handleCommentDelete(comment.id)} className="delete-btn">
                      Delete Comment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
