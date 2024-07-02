import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function AdDetails({ ad, setShowAdDetails }) {
    return (
        <div className="details-container">
            <FontAwesomeIcon icon={faXmark} className='icon' title="close" onClick={() => setShowAdDetails(false)} />
            <button onClick={() => { setShowAdDetails(false); setShowUpdateAd(true); }}>Update Ad</button>
            <div className="info-container">
                <p><strong>Category:</strong> {ad && ad.category}</p>
                <p><strong>Price:</strong> {ad && ad.price}</p>
                <p><strong>Area:</strong> {ad && ad.area}</p>
                <p> {ad && ad.description}</p>
            </div>
            <div className="image-container">
                <img src={ad.image} alt="image" />
            </div>
        </div>
    )
}
export default AdDetails;