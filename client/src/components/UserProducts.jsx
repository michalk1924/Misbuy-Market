import { React, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import UserProductBox from "./UserProductBox";
import '../style/userProducts.css'
function UserProducts() {
    const {userId}=useParams();
    const [userProductsList, setUserProductsList] = useState([]);

    useEffect(() => {
        setUserProductsList([{ _id: 3, area: "gg", price: "5", category: "shoes" }, { _id: 3, area: "gg", price: "5", category: "shoes" }])
        // getUserProducts();
    }, []);

    async function getUserProducts() {
        const url = `http://localhost:3000/users/${userId}/items`;
        const response = await fetch(url);
        const data = await response.json();
        setUserProductsList(data);
    }
    function removeItem(id) {
        //מחיקת פריט מרשימת המשאלות
    }

    return (
        <div>
            <div className="products-list">
                {userProductsList.map((item, index) => (
                    <UserProductBox item={item} removeItem={removeItem} key={index} />
                ))}
            </div>
        </div>
    )
}
export default UserProducts