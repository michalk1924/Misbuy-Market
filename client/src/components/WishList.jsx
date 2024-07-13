import { React, useState, useEffect, useContext } from "react"
import WishItem from "./WishItem";
import { UserContext } from "./UserProvider";
import { TokenContext } from "./TokenProvider";

function WishList() {

  const { userId } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    if (userId && token) {
      getWishList();
    }
  }, [userId, token]);

  async function getWishList() {
    console.log(userId);
    console.log(token);
    const url = `http://localhost:3000/api/users/${userId}/wishlist`;
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      }
    });
    if (response.ok) {
      const data = await response.json();
      if(data) setWishList(data);
    }
  }

  async function removeItem(item) {
    const url = `http://localhost:3000/api/users/${userId}/update-wishlist/${item._id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      }
    });
    if (response.ok) {
      getWishList();
    }
  }

  return (
    <div>
      {userId&&<div className="wish-list">
        <h1 className="webTitle">Your Wish List</h1>
        {wishList.map((item, index) => (
          <WishItem item={item} removeItem={removeItem} key={index}/>
        ))}
      </div>}
      {!userId&&<h1>This Page is not Available</h1>}
    </div>
  )
}
export default WishList