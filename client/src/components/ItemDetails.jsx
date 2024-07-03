import { useState, useEffect, React, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserProvider';
import { TokenContext } from './TokenProvider';
import { addToWishList } from '../functions';
import '../style/itemDetails.css'
function ItemDetails() {

  const { userId } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [item, setItem] = useState({});
  const [seeDescription, setSeeDescription] = useState(false);
  const [seeSellerDetails, setSeeSellerDetails] = useState(false);

  const { itemId, category } = useParams();

  async function getItem(id) {
    if (id) {
      try {
        const url = `http://localhost:3000/api/${category}/${id}`;
        const response = await fetch(url);
        const data = await response.json()
        setItem(data)
      }
      catch (error) {
        alret("Error fetching item");
      }
    }
  }

  useEffect(() => {
    getItem(itemId)
  }, [itemId]);

  return (
    <div className="details-container">
      <div className="info-container">
        <FontAwesomeIcon icon={faHeart} className='icon' title="Add to Wish List"
          onClick={(event) => addToWishList(event, userId, item._id, token)}  />
        <p><strong>Category:</strong> {item && item.category}</p>
        <p><strong>Type:</strong> {item && item.type}</p>
        {item.size && <p><strong>Size:</strong> {item && item.size}</p>}
        <p><strong>Color:</strong> {item && item.color}</p>
        <p><strong>Price:</strong> {item && item.price}</p>
        <p><strong>Area:</strong> {item && item.area}</p>
        <p className="seeMoreLess" onClick={() => setSeeDescription(!seeDescription)}><strong>Description</strong></p>
        {seeDescription && <p> {item && item.description}</p>}
        <p className="seeMoreLess" onClick={() => setSeeSellerDetails(!seeSellerDetails)}><strong>Seller Details </strong></p>
        {seeSellerDetails && <div>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone:</strong> {item.phone}</p>
        </div>}
      </div>
      <div className="itemDetailsImg">
        <img src={item.image} alt="image"  />
      </div>
    </div>
  );
};

export default ItemDetails;
