import { BASE_URL_DEV } from "../Utils/globalvariables";
import axios from 'axios';



export const addRecipe = async (name, category, ingredients, instructions, imageUrl) => {

    const recipeData = {
        name,
        category,
        ingredients,
        instructions,
        imageUrl,
        user: { email: localStorage.getItem('username') }
    };
      
    try {
        const result = await fetch(`${BASE_URL_DEV}/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(recipeData)
        });

        if (!result.ok) {
            throw new Error(`Add recipe failed with status: ${result.status}`);
        }
        const data = await result.json();
        console.log(data);
    } catch (error) {
        console.error('Add recipe failed:', error);
        throw error; 
    }
}

export const fetchRecipes = async () => {
    try {
        const result = await fetch(`${BASE_URL_DEV}/recipe`);
        
        if (!result.ok) {
            throw new Error(`Fetch recipes failed with status: ${result.status}`);
        }

        const data = await result.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        throw e; 
    }
}
export const uploadFile = async (file) => {
    const email = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    // Upload the file
    const formData = new FormData();
    formData.append('image', file, file.name);

    const response = await axios.post(`${BASE_URL_DEV}/recipe/upload`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total);
        }
    });

    if (response.status === 200) {
        const generatedFileName = response.data.fileName; 
        return generatedFileName;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}


export const editRecipe = async (id, recipeData) => {
    try {
        const response = await fetch(`${BASE_URL_DEV}/recipe/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating recipe:', error);
    }
}
export const fetchRecipeById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL_DEV}/recipe/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
}

export const fetchRecipeByEmail = async (email) => {
    try {
        const response = await fetch(`${BASE_URL_DEV}/recipe/personal/${email}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

export const fetchCommentsByRecipeId = async (id) => {
    const response = await fetch(`${BASE_URL_DEV}/comment/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    return comments;
};

export async function deleteRecipe(recipeId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL_DEV}/recipe/${localStorage.getItem('username')}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(recipeId) 
    });
    return response.json();
  }


export const postComment = async (id, text) => {
    const response = await fetch(`${BASE_URL_DEV}/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,

            email: localStorage.getItem('username'),
        },
        body: JSON.stringify({
            text: text,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export const deleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL_DEV}/comment/${localStorage.getItem('username')}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(commentId) 
      });
      return response.json();
    };