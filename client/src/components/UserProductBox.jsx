import { React, useContext, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/userProductBox.css'
import AdDetails from "./AdDetails";
import UpdateAd from "./UpdateAd";
import { UserContext } from "./UserProvider";
import { TokenContext } from './TokenProvider';

function UserProductBox({ item, getUserProducts}) {

    const {token} = useContext(TokenContext);
    const { userId } = useContext(UserContext);

    const [showAdDetails, setShowAdDetails] = useState(false);
    const [showUpdateAd, setShowUpdateAd] = useState(false);

    async function deleteItem(){
        try{
            const url = `http://localhost:3000/api/${item.category}/${item._id}`;
            const response = await fetch(url, {
                 method: 'DELETE',
                 headers: {
                     Authorization: token,
                     'Content-Type': 'application/json',

                 },
                 body: JSON.stringify({ userId: userId }),
                 });
            if (response.ok) {
                console.log('Item deleted successfully');
                getUserProducts();
            } else {
                throw new Error('Failed to delete item');
            }
        }catch (e) {
            console.error('Error deleting item');
        } 
    }
    return (
        <div className="item-box">
            {showAdDetails && <AdDetails ad={item} setShowAdDetails={setShowAdDetails} setSshowUpdateAd={setShowUpdateAd} />}
            {showUpdateAd && <UpdateAd ad={item} setShowUpdateAd={setShowUpdateAd} setShowAdDetails={setShowAdDetails} />}
            <img src={item.image} alt="image item" />
            <div id="shortDescription">
                <p><b>{item.title}</b></p>
                <FontAwesomeIcon icon={faEye} className='icon' title="see more" onClick={() => setShowAdDetails(true)} />
                <FontAwesomeIcon icon={faPen} className='icon' title="update" onClick={() => setShowUpdateAd(true)} />
                <button onClick={deleteItem}>
                    <FontAwesomeIcon icon={faTrash} className='icon' title="remove item" />
                </button>
            </div>
        </div>
    )
}
export default UserProductBox;