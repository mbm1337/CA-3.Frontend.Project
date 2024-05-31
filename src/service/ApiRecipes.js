import { BASE_URL_DEV } from "../Utils/globalvariables";



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
