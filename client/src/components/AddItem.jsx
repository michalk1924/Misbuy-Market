import React, { useState } from 'react';

function AddItem() {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleImageChange = (e) => {
        // Handle image upload and update state accordingly
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to backend or handle as required
    };

    return (
        <div className="addItemContainer">
            <h2>Add Item</h2>
            <form className="addItemForm" onSubmit={handleSubmit}>
                <div>
                    <label className="addItemLabel" htmlFor="category">Select Category:</label>
                    <select className="addItemInput" id="category" value={category} onChange={handleCategoryChange}>
                        <option value="shoes">Shoes</option>
                        <option value="shirts">Shirts</option>
                        <option value="skirts">Skirts</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="price">Price:</label>
                    <input className="addItemInput" type="number" id="price" value={price} onChange={handlePriceChange} />
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="description">Description:</label>
                    <textarea className="addItemInput" id="description" value={description} onChange={handleDescriptionChange} />
                </div>  
                <div>
                    <label className="addItemLabel" htmlFor="images">Upload Images:</label>
                    <input className="addItemInput" type="file" id="images" multiple onChange={handleImageChange} />
                </div>
                <button className="addItemSubmitButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddItem;
