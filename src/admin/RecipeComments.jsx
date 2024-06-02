import React, { useEffect, useState } from 'react';
import { getAllRecipes, getCommentsForRecipe, deleteComment, deleteRecipe } from '../service/adminapi';

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  recipeList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  recipeItem: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    width: '300px',
    textAlign: 'center',
  },
  recipeBtn: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '5px 2px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '5px 2px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#f44336',
  },
  commentList: {
    marginTop: '10px',
  },
  commentItem: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '10px',
  },
  commentText: {
    margin: 0,
    padding: 0,
  },
  commentUser: {
    color: '#555',
    fontSize: '12px',
  },
};

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

    if (selectedRecipeId === recipeId) {
      setSelectedRecipeId(null);
      setComments([]);
    }
  };

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.center}>Vælg opskrift for at se kommentar eller for at slette en opskrift</h2>
      <div style={styles.recipeList}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={styles.recipeItem}>
            <button onClick={() => handleRecipeSelect(recipe.id)} style={styles.recipeBtn}>
              {recipe.name}
            </button>
            <button onClick={() => handleRecipeDelete(recipe.id)} style={{ ...styles.button, ...styles.deleteBtn }}>
              Delete Recipe
            </button>
            {selectedRecipeId === recipe.id && (
              <div style={styles.commentList}>
                {Array.isArray(comments) && comments.map(comment => (
                  <div key={comment.id} style={styles.commentItem}>
                    <p style={styles.commentText}>{comment.text}</p>
                    <p style={styles.commentUser}>Posted by: {comment.userEmail}</p>
                    <button onClick={() => handleCommentDelete(comment.id)} style={{ ...styles.button, ...styles.deleteBtn }}>
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

