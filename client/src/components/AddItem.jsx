import React, { useContext, useState } from 'react';
import '../style/addItem.css';
import { useNavigate } from 'react-router-dom';
import { Token } from './TokenProvider';

function AddItem() {
    const tokenContext = useContext(Token);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [wrong, setWrong] = useState(false);
    const [wrongExists, setWrongExists] = useState(false);
    const [token, setToken] = useState(tokenContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the array
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('abc');
        const formDataWithImage = new FormData();
        //console.log(formDataWithImage.append)
        formDataWithImage.append('sara','aaaa');
        //console.log(formDataWithImage.entries());
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        if (image) {
            formDataWithImage.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/electricalProducts`, {
                method: 'POST',
                body: JSON.stringify({"a":"aa"}),//(formDataWithImage),
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 409) {
                    setWrongExists(true);
                    setWrong(false);
                } else {
                    setWrong(true);
                    setWrongExists(false);
                }
            } else {
                const data = await response.json();
                setToken(data);
                navigate(`/home`, { state: data });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="addItemContainer">
            <h2>Add Item</h2>
            <form className="addItemForm" onSubmit={handleSubmit}>
                <div>
                    <label className="addItemLabel" htmlFor="category">
                        Select Category:
                    </label>
                    <select className="addItemInput" id="category" name="category" onChange={handleChange}>
                        <option value=""></option> {/* Empty option */}
                        <option value="shoes">Shoes</option>
                        <option value="clothes">Clothes</option>
                        <option value="bags">Bags</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="price">
                        Price:
                    </label>
                    <input className="addItemInput" type="number" id="price" name="price" onChange={handleChange} />
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="title">
                        Title:
                    </label>
                    <input className="addItemInput" type="text" id="title" name="title" onChange={handleChange} />
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="description">
                        Description:
                    </label>
                    <textarea className="addItemInput" id="description" name="description" onChange={handleChange} />
                </div>
                <div>
                    <label className="addItemLabel" htmlFor="image">
                        Upload Image:
                    </label>
                    <input className="addItemInput" type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <button className="addItemSubmitButton" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddItem;