import React from 'react';
import '../style/itemDetails.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';

function ItemDetails() {
  const [item, setItem] = useState({});
  const [seeDescription, setSeeDescription] = useState(false);
  const [seeSellerDetails, setSeeSellerDetails] = useState(false);

  const { itemId, category } = useParams(); // Accessing URL parameter directly


  async function getItem(id) {
    if (id) {
      console.log(id);
      const url = `http://localhost:3000/api/${category}/${id}`;
      const response = await fetch(url);
      const data = await response.json()
      console.log(data);
      setItem(data)
    }
  }

  
  function addToWishList(event){
    event.stopPropagation();
    alert("love");
    //להוסיף לרשימת המשאלות
  }
  
  useEffect(() => {
    getItem(itemId)
  }, [itemId]);

  return (
    <div className="details-container">
      <div className="info-container">
      <FontAwesomeIcon icon={faHeart} className='icon' title="Add to Wish List" onClick={addToWishList}/>
        <p><strong>id:</strong> {item && item._id}</p>
        <p><strong>Category:</strong> {item && item.category}</p>
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
      <div className="image-container">
        <img src={item.image} alt="image" />
      </div>
    </div>
  );
};

export default ItemDetails;
