import React from 'react';
import '../style/itemDetails.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const [item, setItem] = useState({});
  let {itemId} = useParams(); // Accessing URL parameter directly

  async function getItem(id) {
    if (id) {
      console.log(id);
      const url = `http://localhost:3000/api/allItems/${id}`;
      const response = await fetch(url);
      const data = await response.json()
      console.log(data);
      setItem(data)
    }
  }

  useEffect(() => {
    getItem(itemId)
  }, [itemId]);

  return (
    <div className="details-container">
      <div className="image-container">
        <img src={item && `data:image/png;base64,${item.image}`} alt="image" />
      </div>
      <div className="info-container">
        <div>
          <p><strong>id:</strong> {item && item._id}</p>
          <p><strong>Category:</strong> {item && item.category}</p>
          <p><strong>Description:</strong> {item && item.description}</p>
          <p><strong>Price:</strong> {item && item.price}</p>
          <p><strong>Area:</strong> {item && item.area}</p>
          {/* <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Area:</strong> {customer.area}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
