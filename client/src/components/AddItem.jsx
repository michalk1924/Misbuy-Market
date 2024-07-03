import React, { useContext, useEffect, useState } from 'react';
import '../style/addItem.css';
import { useNavigate } from 'react-router-dom';
import Selectors from './Selectors';
import { TokenContext } from './TokenProvider';


function AddItem() {

    const navigate = useNavigate();

    const { token } = useContext(TokenContext);

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [wrong, setWrong] = useState(false);
    const [wrongExists, setWrongExists] = useState(false);

    const form = {
        category: "",
        type: "",
        color: "",
        size: "",
        price: "",
        title: "",
    }

    useEffect(() => {
        setFormData(form)
    }, []);

    const shoesSelectors = [
        { title: "type", options: ["sneakers", "boots", "sandals", "loafers", "heels", "flats", "oxfords", "slippers", "espadrilles", "flip-flops", "wedges", "moccasins", "athletic shoes", "pumps", "platforms", "mary janes"] },
        { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
        { title: "size", options: ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"]}
    ]
    const clothesSelectors = [
        { title: "type", options: ["t-shirt", "shirt", "blouse", "tank top", "sweater", "hoodie", "jacket", "coat", "dress", "skirt", "jeans", "trousers", "shorts", "leggings", "suit", "tie", "scarf", "gloves", "hat", "socks", "swimsuit", "robe", "pajamas"] },
        { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
        { title: "size", options: ["XS", "S", "M", "L", "XL", "XXL"] }
    ]
    const accessoriesSelectors = [
        { title: "type", options: ["necklace", "bracelet", "ring", "earrings", "watch", "belt", "scarf", "hat", "sunglasses", "gloves", "handbag", "backpack", "wallet", "tie", "bow tie", "hairpin", "headband", "umbrella"] },
        { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token);
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        if (image) {
            console.log(image);
            formDataWithImage.append('image', image);
        }
        try {
            const response = await fetch(`http://localhost:3000/api/${category.value}`, {
                method: 'POST',
                body: formDataWithImage,
                headers: {
                    Authorization: token,
                },
            });

            if (!response.ok) {
                if (response.status === 409) {
                    setWrongExists(true);
                    setWrong(false);
                } else {
                    if (response.status == 403) alert("user not connected")
                    setWrong(true);
                    setWrongExists(false);
                }
            } else {
                console.log();
                navigate(`/home`);
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
                    <select className="addItemInput" id="category" name="category" onChange={handleChange} required>
                        <option value=""></option>
                        <option value="shoes">Shoes</option>
                        <option value="clothes">Clothes</option>
                        <option value="accessories">Accessories</option>
                    </select>

                    {formData.category == "shoes" && <Selectors selectors={shoesSelectors} handleChange={handleChange} />}
                    {formData.category == "clothes" && <Selectors selectors={clothesSelectors} handleChange={handleChange} />}
                    {formData.category == "accessories" && <Selectors selectors={accessoriesSelectors} handleChange={handleChange} />}

                    <label className="addItemLabel" htmlFor="price">Price:</label>
                    <input className="addItemInput" type="number" id="price" name="price" onChange={handleChange} />

                    <label className="addItemLabel" htmlFor="title"> Title:</label>
                    <input className="addItemInput" type="text" id="title" name="title" onChange={handleChange} />

                    <label className="addItemLabel" htmlFor="description">Description:</label>
                    <textarea className="addItemInput" id="description" name="description" onChange={handleChange} />

                    <label className="addItemLabel" htmlFor="image">Upload Image:</label>
                    <input className="addItemInput" type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <button className="addItemSubmitButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddItem;
