import React from 'react';
import '../style/itemDetails.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const ItemDetails = ({ customer }) => {
  async function getItem(id) {
    const url = `http://localhost:3000/api/electricalProducts/${id}`
    const response = await fetch(url)
    const data = await response.json()
    setItem(data)
  }
  const [item, setItem] = useState({});
  
  useEffect(() => {
    const {id}=useParams();
    getItem(id)
  }, []);

  return (
    <div className="details-container">
      <div className="image-container">
        <img src={item && item.image} alt="Item" />
      </div>
      <div className="info-container">
        <div>
          <p><strong>Category:</strong> {item && item.category}</p>
          <p><strong>Description:</strong> {item && item.description}</p>
          <p><strong>Price:</strong> {item && item.price}</p>
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
