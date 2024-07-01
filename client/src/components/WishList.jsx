import { React, useState, useEffect, useContext } from "react"
import WishItem from "./WishItem";
import { UserContext } from "./UserProvider";
import { TokenContext } from "./TokenProvider";

function WishList() {

  const { userId } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    const url = `http://localhost:3000/api/users/${userId}/wishlist`;
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      }
    });
    if(response.ok)
      {
        const data = await response.json();
        console.log(data);
        setWishList(data);
      }
  }
  function removeItem(id) {
    //מחיקת פריט מרשימת המשאלות
  }

  return (
    <div>
      <div className="wish-list">
        {wishList.map((item, index) => (
          <WishItem item={item} removeItem={removeItem} />
        ))}
      </div>
    </div>
  )
}
export default WishList