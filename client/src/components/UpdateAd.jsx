import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TokenContext } from './TokenProvider';
import '../style/updateAd.css'

function UpdateAd({ ad, setShowUpdateAd, setShowAdDetails, getUserProducts }) {

    const { token } = useContext(TokenContext);

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const form = {
        price: ad.price || "",
        title: ad.title || "",
        description: ad.description || "",
    }

    useEffect(() => {
        console.log(image);
        setFormData(form);
        setImage(ad.image);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleImage = (e) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                const dataURL = e.target.result;
                setImage(dataURL);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('No file selected');
        }
    };

    const update = async () => {
        try {
            const formDataWithImage = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithImage.append(key, value);
            });
            if (imageFile) {
                formDataWithImage.append('image', imageFile);
            }
            formDataWithImage.append('userId', ad.userId)
            const url = `http://localhost:3000/api/${ad.category}/${ad._id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formDataWithImage
            });
            if (response.ok) {
                setShowAdDetails(false);
                setShowUpdateAd(false);
                getUserProducts();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="ad-box">
            <FontAwesomeIcon icon={faXmark} className='icon' title="close" onClick={() => setShowUpdateAd(false)} /><br />
            <div id="main-content">
                <div className="info-container">
                    <label className="addItemLabel" htmlFor="price">Price:</label>
                    <input className="addItemInput" type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

                    <label className="addItemLabel" htmlFor="title"> Title:</label>
                    <input className="addItemInput" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

                    <label className="addItemLabel" htmlFor="description">Description:</label>
                    <textarea className="addItemInput" id="description" name="description" value={formData.description} onChange={handleChange} />

                </div>
                <div className="image-container">
                    <label>
                        <strong>change image:</strong>
                        <input type="file" id="image" name="image" onChange={handleImage} />
                    </label>
                    <img src={image} alt="image" />
                </div>
            </div>
            <button onClick={update}>Save Changes</button>

        </div >
    );
}

export default UpdateAd;
