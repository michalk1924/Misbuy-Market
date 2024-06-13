import React from 'react';
import { Link } from 'react-router-dom';
import '../style/itemBox.css'


const ItemBox = ({ item }) => {
  return (
    <div className="item-box">
      <Link to={`${item._id}`}>
        <img src={`data:image/png;base64,${item.image}`} alt="Item" />
        <p>Price: {item.price}</p>
        <p>Area: {item.area}</p>
      </Link>
    </div>
  );
};

export default ItemBox;
