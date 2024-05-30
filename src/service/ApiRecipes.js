import { BASE_URL_DEV } from "../Utils/globalvariables";

export const addRecipe = async (name, category, ingredients, instructions, imageUrl) => {
    try {
        const result = await fetch(`${BASE_URL_DEV}/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, category, ingredients, instructions, imageUrl })
        });

        if (!result.ok) {
            throw new Error(`Add recipe failed with status: ${result.status}`);
        }

        const data = await result.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        throw e; 
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