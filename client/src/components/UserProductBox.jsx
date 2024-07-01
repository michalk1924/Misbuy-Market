import { React, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import '../style/userProductBox.css'
import AdDetails from "./AdDetails";
import UpdateAd from "./UpdateAd";

function UserProductBox({ item }) {
    const [showAdDetails, setShowAdDetails] = useState(false);
    const [showUpdateAd, setSshowUpdateAd] = useState(false);

    return (
        <div className="item-box">
            {showAdDetails && <AdDetails setShowAdDetails={setShowAdDetails} />}
            {showUpdateAd && <UpdateAd setSshowUpdateAd={setSshowUpdateAd} />}
            <img src={item.image} alt="image item" />
            <div id="shortDescription">
                <p><b>{item.title}</b></p>
                <FontAwesomeIcon icon={faEye} className='icon' title="see more" onClick={() => setShowAdDetails(true)} />
                <FontAwesomeIcon icon={faPen} className='icon' title="update" onClick={() => setSshowUpdateAd(true)} />
            </div>
        </div>
    )
}
export default UserProductBox;