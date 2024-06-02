import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById,fetchCommentsByRecipeId, postComment,deleteComment} from '../service/ApiRecipes';
import { BASE_URL_DEV } from "../Utils/globalvariables";


const RecipeDetail = () => {

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9', // light gray background
            borderRadius: '10px', // rounded corners
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // slight shadow for depth
        },
        title: {
            color: '#333',
            marginBottom: '20px',
        },
        image: {
            maxWidth: '100%',
            height: 'auto',
            marginBottom: '20px',
        },
        paragraph: {
            textAlign: 'left',
            color: '#666',
            marginBottom: '10px',
        },
        commentsContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // align items to the start
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
        comments: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // center the comments
        },
        commentBox: {
            padding: '10px',
            backgroundColor: '#e9e9e9',
            borderRadius: '5px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            width: '300px',
        },
        commentUser: {
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        commentInput: {
            width: '100%', // full width
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        postCommentButton: {
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        commentHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        deleteButton: {
            fontSize: '0.8rem',
            padding: '5px 10px',
            color: '#fff',
            backgroundColor: '#f44336',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };
   
        const email = localStorage.getItem('username');
        const role = localStorage.getItem('roles'); 
        const isLoggedIn = Boolean(email);
  
    
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const fetchedRecipe = await fetchRecipeById(id);
            setRecipe(fetchedRecipe);
        };

        fetchRecipe();
    }, [id]);

    
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const fetchedComments = await fetchCommentsByRecipeId(id);
            setComments(fetchedComments);
        };

        fetchComments();
    }, [id]);

    const postAndFetchComments = async (id, text) => {
        await postComment(id, text);
        const newComments = await fetchCommentsByRecipeId(id);
        setComments(newComments);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }
    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            const refreshedComments = await fetchCommentsByRecipeId(id);
            setComments(refreshedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div style={styles.container}>
        <h2 style={styles.title}>{recipe.name}</h2>
        <img style={styles.image} src={`${BASE_URL_DEV}/recipe/images/${recipe.imageUrl}`} alt={recipe.name} />
        <p style={styles.paragraph}><strong>Ingredients:</strong> {recipe.ingredients}</p>
        <p style={styles.paragraph}><strong>Instructions:</strong> {recipe.instructions}</p>
        <p style={styles.paragraph}><strong>Category:</strong> {recipe.category}</p>
        <div style={styles.commentsContainer}>
        <h3>Comments</h3>
        <div style={styles.comments}>
        {comments.map((comment, index) => (
    <div key={index} style={styles.commentBox}>
        <div style={styles.commentHeader}>
            <p style={styles.commentUser}>{comment.userEmail}</p>
            {(role === '["admin"]' || email === comment.userEmail) && (
    <button style={styles.deleteButton} onClick={() => handleDelete(comment.id)}>Delete</button>
)}
        </div>
        <p>{comment.text}</p>
        <p style={{fontSize: 'small', textAlign: 'right'}}>
            {new Date(comment.date).toLocaleDateString()}
        </p>
    </div>
))}
      {isLoggedIn && (
    <div>
        <input
            style={styles.commentInput}
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a comment..."
        />
     <button style={styles.postCommentButton} onClick={() => postAndFetchComments(id, newComment)}>
    Post Comment
</button>
    </div>
)}
        </div>
    </div>
    </div>
    );
};

export default RecipeDetail;