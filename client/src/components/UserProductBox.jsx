import { React, useContext, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/userProductBox.css'
import { UserContext } from "./UserProvider";
import { TokenContext } from './TokenProvider';

function UserProductBox({ item, getUserProducts, setAdDetails, setShowAdDetails, setShowUpdateAd }) {

    const { token } = useContext(TokenContext);
    const { userId } = useContext(UserContext);

    async function deleteItem() {
        try {
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
        } catch (e) {
            console.error('Error deleting item');
        }
    }
    return (
        <div className="item-box">
            <img src={item.image} alt="image item" />
            <div className="productTitle">
                <p><b>{item.title}</b></p>
                <div>
                    <FontAwesomeIcon icon={faEye} className='icon' title="see more" onClick={() => { setShowAdDetails(true); setAdDetails(item); }} />
                    <FontAwesomeIcon icon={faPen} className='icon' title="update" onClick={() => { setShowUpdateAd(true); setAdDetails(item); }} />
                    <FontAwesomeIcon icon={faTrash} className='icon' title="remove item" onClick={deleteItem} />
                </div>
            </div>
        </div>
    )
}
export default UserProductBox;