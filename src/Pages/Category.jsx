import React, { useState } from 'react';

const Category = ({ onSubmitCategory }) => {
    const [category, setCategory] = useState('');
    const[visible,setVisible]= useState(false);
    const categories = ['dessert', 'seafood', 'meat', 'chicken', 'pasta', 'cold'];

    const handleDropdownChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        onSubmitCategory(selectedCategory);
    };
    

    return (
        <div className='category-recipe'>
            <label htmlFor="dropdown" onClick={()=>setVisible(!visible)}>Category</label>
           { visible && <select id="dropdown" value={category}  onChange={handleDropdownChange}>
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>}
            
        </div>
    );
};

export default Category;
