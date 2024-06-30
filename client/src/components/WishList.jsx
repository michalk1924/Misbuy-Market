import  { React, useState , useEffect} from "react"
import WishItem from "./WishItem";

function WishList() {
    const [userId, setUserId]=useState();
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        setWishList([{_id:3, area:"gg", price:"5", category:"shoes"},{_id:3, area:"gg", price:"5", category:"shoes"}])
       // getWishList();
    }, []);
  
    async function getWishList() {
      const url = `http://localhost:3000/users/${userId}wishList`;
      const response = await fetch(url);
      const data = await response.json();
      setWishList(data);
    }
    function removeItem(id){
//מחיקת פריט מרשימת המשאלות
    }
  
    return (
      <div>
        <div className="wish-list">
          {wishList.map((item, index) => (
            <WishItem item={item} removeItem={removeItem}/>
          ))}
        </div>
      </div>
    )
}
export default WishList