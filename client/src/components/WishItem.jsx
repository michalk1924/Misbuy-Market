import {React} from "react"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/wishItem.css'
function WishItem({ item, removeItem }) {

    const navigate=useNavigate();
    
    function deleteItem(event) {
        event.stopPropagation();
        const ans = window.confirm("Are You Sure That You Want To Delete This Item From Your Wish List?");
        console.log(ans);
        if (ans)
            removeItem(item);
    }

    function navigateToItem(){
        navigate(`/items/${item.category}/${item._id}`)
    }
    return (
            <div className="wishItem" onClick={navigateToItem}>
                <img src={item.image} alt="image item" />
                <div className="shortDescription">
                    <p>Price:<b> {item.price}</b></p>
                    <p>Area: {item.area}</p>
                    <button onClick={deleteItem}>
                        <FontAwesomeIcon icon={faTrash} className='icon' title="remove item" />
                    </button>
                </div>
            </div>
    )
}
export default WishItem