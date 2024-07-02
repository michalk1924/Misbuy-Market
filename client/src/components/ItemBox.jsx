import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../style/itemBox.css'
import { addToWishList } from '../functions';
import { UserContext } from './UserProvider';
import { TokenContext } from './TokenProvider';
import { useContext } from 'react';

const ItemBox = ({ item }) => {

  const { category } = useParams();

  const { token } = useContext(TokenContext);
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div onClick={() => { navigate(category && `../${item.category}/${item._id}` || `../items/${item.category}/${item._id}`) }} className="item-box">
      <img src={item.image} alt="image item" />
      <div id="shortDescription">
        <div>
          <p>Price:<b> {item.price}</b></p>
          <p>Area: {item.area}</p>
        </div>
        <FontAwesomeIcon icon={faHeart} className='icon' title="Add to Wish List"
          onClick={(event) => addToWishList(event, userId, item._id, token)} />
      </div>
    </div>
  );
};

export default ItemBox;
