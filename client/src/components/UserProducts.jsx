import { React, useState, useEffect, useContext } from "react"
import UserProductBox from "./UserProductBox";
import '../style/userProducts.css'
import { TokenContext } from "./TokenProvider";
import { UserContext } from "./UserProvider";
import { TailSpin } from 'react-loader-spinner';

function UserProducts() {

    const { token } = useContext(TokenContext);
    const { userId } = useContext(UserContext);

    const [userProductsList, setUserProductsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserProducts();
    }, []);

    async function getUserProducts() {
        setLoading(true)
        const url = `http://localhost:3000/api/users/${userId}/items`;
        const response = await fetch(url, {
            headers: {
                Authorization: token,
            }
        });
        const data = await response.json();
        setUserProductsList(data);
        setLoading(false);
    }
    function removeItem(id) {
        //מחיקת פריט מרשימת המשאלות
    }

    return (
        <div>
            <div className="products-list">
                {!loading && userProductsList.map((item, index) => (
                    <UserProductBox item={item} removeItem={removeItem} key={index} getUserProducts={getUserProducts} />
                ))}
                {loading && (
                    <div className="loading-spinner">
                        <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
                    </div>
                )}
            </div>
        </div>
    )
}
export default UserProducts