import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../style/itemBox.css'

const ItemBox = ({ item }) => {

  const { category } = useParams();

  const navigate = useNavigate();

  async function addToWishList(event) {
    event.stopPropagation();
    try {
      const url = `http://localhost:3000/api/users/${userId}/update-wishlist`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: itemId })
      });
      if (response.ok)
        alert("Item added to wishlist");
    }
    catch (error) {
      alret("Error adding item to wishlist");
    }
  }
  return (
    <div onClick={() => { navigate(category && `../${item.category}/${item._id}` || `../items/${item.category}/${item._id}`) }} className="item-box">
      <img src={item.image} alt="image item" />
      <div id="shortDescription">
        <div>
          <p>Price:<b> {item.price}</b></p>
          <p>Area: {item.area}</p>
        </div>
        <FontAwesomeIcon icon={faHeart} className='icon' title="Add to Wish List" onClick={addToWishList} />
      </div>
    </div>
  );
};

export default ItemBox;
