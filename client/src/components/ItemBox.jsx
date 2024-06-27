import { Link, useParams } from 'react-router-dom';

import '../style/itemBox.css'


const ItemBox = ({ item }) => {
  const { category } = useParams();
  return (
    <Link to={category && `../${item.category}/${item._id}` || `../items/${item.category}/${item._id}`} className="item-box">
      <img src={item.image} alt="image item" />
      <div id="shortDescription">
        <p>Price:<b> {item.price}</b></p>
        <p>Area: {item.area}</p>
      </div>
    </Link>
  );
};

export default ItemBox;
