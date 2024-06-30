import React from "react"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/wishItem.css'
function WishItem({ item, removeItem }) {

    function deleteItem(event) {
        event.stopPropagation();//לסדר שכשלוחצים לא ינווט הלאה
        const ans = window.confirm("Are You Sure That You Want To Delete This Item From Your Wish List?");
        console.log(ans);
        if (ans)
            removeItem(item._id);

    }
    return (
        <Link to={`/items/${item.category}/${item._id}`}>
            <div className="wishItem">
                <img src={item.image} alt="image item" />
                <div className="shortDescription">
                    <p>Price:<b> {item.price}</b></p>
                    <p>Area: {item.area}</p>
                    <button onClick={deleteItem}>
                        <FontAwesomeIcon icon={faTrash} className='icon' title="remove item" />
                    </button>
                </div>
            </div>
        </Link>
    )
}
export default WishItem