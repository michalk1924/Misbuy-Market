import { Link } from 'react-router-dom';
import '../style/itemBox.css'


const ItemBox = ({item}) => {

  return (
    <div className="item-box">
      <Link to={`../${item.category}/${item._id}`}>
        <img src={item.image} alt="image item" />
        <p>Price: {item.price}</p>
        <p>Area: {item.area}</p>
      </Link>
    </div>
  );
};

export default ItemBox;
