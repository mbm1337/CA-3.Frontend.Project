import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const EditRecipe = ({ setUpdated, updated }) => {
    const { id } = useParams();//
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        category: '',
        imageURL: '',
    });
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [fileLabel, setFileLabel] = useState('Der er ikke valgt noget billede');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3002/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setRecipe(data);
                setImageURL(data.imageURL);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImageURL(URL.createObjectURL(file));
        setFileLabel(file ? file.name : 'Der er ikke valgt noget billede');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            category: recipe.category,
        };

        try {
            await fetch(`http://localhost:3002/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(recipeData),
            });

            setUpdated(!updated);
            navigate('/my-recipes');
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <Container>
            <FormBox>
                <h2>Edit Recipe</h2>
                <FormContainer onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={recipe.title}
                        id="title"
                        placeholder="Enter recipe title"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        value={recipe.category}
                        id="category"
                        placeholder="Enter category"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        value={recipe.ingredients}
                        id="ingredients"
                        placeholder="Enter ingredients"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        value={recipe.instructions}
                        id="instructions"
                        placeholder="Enter instructions"
                        onChange={handleChange}
                        required
                    />
                    <FileInputLabel htmlFor="file">
                        Vælg billede
                    </FileInputLabel>
                    <HiddenFileInput
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                    />
                    <p>{fileLabel}</p>
                    {imageURL && <img src={imageURL} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    <SubmitButton type="submit">Update Recipe</SubmitButton>
                </FormContainer>
            </FormBox>
        </Container>
    );
};

export default EditRecipe;
