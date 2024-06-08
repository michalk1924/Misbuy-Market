import React, { useContext,useState } from 'react';
import '../style/addItem.css'
import { Link, useNavigate } from 'react-router-dom';
import { Token } from './UserContext'

function AddItem() {
    const tokenContext = useContext(Token);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);
    const [worng, setWorng] = useState(false);
    const [worngExists, setWorngExists] = useState(false);
    const [token, setToken] = useState(tokenContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(formData);
    };

    const handleImageChange = (e) => {
        setImages(e.target.value)
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/electricalProducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            file:images
        });
        console.log(response.status);
        if (response.status != 200) {
            if (response.status == 409) { setWorngExists(true); setWorng(false); }
            else { setWorng(true); setWorngExists(false); }
        }
        else {
            const token = await response.json();
            setToken(token);
            console.log(token);
            navigate(`/home`, { state: token });
        };
    };

    return (
        <div className="addItemContainer">
            <h2>Add Item</h2>
            <form className="addItemForm" onSubmit={handleSubmit}>
                <div>
                    <label className="addItemLabel" htmlFor="category">Select Category:</label>
                    <select className="addItemInput" id="category" onChange={handleChange}>
                        <option value="shoes">Shoes</option>
                        <option value="shirts">Shirts</option>
                        <option value="skirts">Skirts</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="price">Price:</label>
                    <input className="addItemInput" type="number" id="price" onChange={handleChange} />
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="description">Description:</label>
                    <textarea className="addItemInput" id="description" onChange={handleChange} />
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
