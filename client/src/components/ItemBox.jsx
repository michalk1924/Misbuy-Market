import { Link, useParams , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import '../style/itemBox.css'


const ItemBox = ({ item }) => {

  const { category } = useParams();

  const navigate=useNavigate();

  function addToWishList(event){
    event.stopPropagation();
    alert("love");
    //להוסיף לרשימת המשאלות
  }
  return (
    <div onClick={()=>{navigate(category && `../${item.category}/${item._id}` || `../items/${item.category}/${item._id}`)}} className="item-box">
      <img src={item.image} alt="image item" />
      <div id="shortDescription">
        <p>Price:<b> {item.price}</b></p>
        <p>Area: {item.area}</p>
        <FontAwesomeIcon icon={faHeart} className='icon' title="Add to Wish List" onClick={addToWishList}/>
      </div>
    </div>
  );
};

export default ItemBox;
