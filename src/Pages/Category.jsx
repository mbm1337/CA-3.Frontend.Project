import React, { useState } from 'react';

const Category = ({ onSubmitCategory }) => {
    const [category, setCategory] = useState('');
    const categories = ['dessert', 'seafood', 'meat', 'chicken', 'pasta', 'cold'];

    const handleDropdownChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        onSubmitCategory(selectedCategory);
    };

    return (
        <div>
            <label htmlFor="dropdown">Category</label>
            <select id="dropdown" value={category} onChange={handleDropdownChange}>
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
};

export default Category;
