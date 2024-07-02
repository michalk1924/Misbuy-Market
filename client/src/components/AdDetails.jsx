import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../style/adDetails.css'
function AdDetails({ ad, setShowAdDetails, setShowUpdateAd }) {
    return (
        <div className="ad-container">
            <FontAwesomeIcon icon={faXmark} className='icon' title="close" onClick={() => setShowAdDetails(false)} />
            <button onClick={() => { setShowAdDetails(false); setShowUpdateAd(true); }}>Update Ad</button>
            <div id="main-content">
                <div className="info-container">
                    <p><strong>Title:</strong> {ad && ad.title}</p>
                    <p><strong>Category:</strong> {ad && ad.category}</p>
                    <p><strong>Type:</strong> {ad && ad.type}</p>
                    <p><strong>Price:</strong> {ad && ad.price}</p>
                    <p><strong>Area:</strong> {ad && ad.area}</p>
                    <p><strong>ViewsCounter: </strong>{ad && ad.viewsCounter}</p>
                    <p> {ad && ad.description}</p>
                </div>
                <div className="image-container">
                    <img src={ad.image} alt="image" />
                </div>
            </div>
        </div>
    )
}
export default AdDetails;