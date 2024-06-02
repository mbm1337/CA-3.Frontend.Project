import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { editRecipe, uploadFile, fetchRecipeById } from '../service/ApiRecipes';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormBox = styled.div`
    background-color: #c5d4db; 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 100%;
    text-align: center; 
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const FileInputLabel = styled.label`
    display: inline-block;
    padding: 8px 12px;
    background-color: #E0E0E2;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const SubmitButton = styled.button`
    background-color: #E0E0E2;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold; 

    &:hover {
        background-color: #d0d0d2;
    }
`;

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const email = localStorage.getItem('username');
    const [file, setFile] = useState(null);
    const [fileLabel, setFileLabel] = useState('No file chosen');
    const [imageURL, setImageURL] = useState('');
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        category: '',
        imageUrl: '',
        user: {
            "email": email
         }
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            const fetchedRecipe = await fetchRecipeById(id);
            setRecipe(fetchedRecipe);
            setImageURL(fetchedRecipe.imageUrl);
        };

        fetchRecipe();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalFileName = recipe.imageUrl; 
        if (file) {
            finalFileName = await uploadFile(file);
    
        }
    
        const recipeData = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            category: recipe.category,
            imageUrl: finalFileName,
            user: {
                "email": email
             }
        };

        await editRecipe(recipe.id, recipeData);

        try {
            await editRecipe(id, recipeData);
            navigate('/my-recipes');
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    return (
        <Container>
            <FormBox>
                <h2>Edit Recipe</h2>
                <FormContainer onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={recipe.name}
                        name="name"
                        placeholder="Enter recipe title"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        value={recipe.category}
                        name="category"
                        placeholder="Enter category"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        value={recipe.ingredients}
                        name="ingredients"
                        placeholder="Enter ingredients"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        value={recipe.instructions}
                        name="instructions"
                        placeholder="Enter instructions"
                        onChange={handleChange}
                        required
                    />
                    <input type="file" onChange={handleFileChange} />
         
                    {imageURL && <img src={imageURL} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    <SubmitButton type="submit">Update Recipe</SubmitButton>
                </FormContainer>
            </FormBox>
        </Container>
    );
};

export default EditRecipe;
