import { React, useState, useEffect, useContext } from "react"
import UserProductBox from "./UserProductBox";
import '../style/userProducts.css'
import { TokenContext } from "./TokenProvider";
import { UserContext } from "./UserProvider";
import { TailSpin } from 'react-loader-spinner';
import AdDetails from "./AdDetails";
import UpdateAd from "./UpdateAd";
function UserProducts() {

    const { token } = useContext(TokenContext);
    const { userId } = useContext(UserContext);

    const [userProductsList, setUserProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdDetails, setShowAdDetails] = useState(false);
    const [showUpdateAd, setShowUpdateAd] = useState(false);
    const [adDetails, setAdDetails] = useState(null);

    useEffect(() => {
        if (userId && token) {
            getUserProducts();
        }
      }, [userId, token]);

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

    return (
        <div>
            {showAdDetails && <AdDetails ad={adDetails} setShowAdDetails={setShowAdDetails} setShowUpdateAd={setShowUpdateAd} />}
            {showUpdateAd && <UpdateAd ad={adDetails} setShowUpdateAd={setShowUpdateAd} setShowAdDetails={setShowAdDetails}
            getUserProducts={getUserProducts} />}
            {userId && <div className="products-list">
                {!loading && userProductsList.map((item, index) => (
                    <UserProductBox item={item} key={index}
                     getUserProducts={getUserProducts} setShowUpdateAd={setShowUpdateAd}
                     setShowAdDetails={setShowAdDetails} setAdDetails={setAdDetails}/>
                ))}
                {loading && (
                    <div className="loading-spinner">
                        <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
                    </div>
                )}
            </div>}
            {!userId && <h1>This Page is not Available</h1>}
        </div>
    )
}
export default UserProducts