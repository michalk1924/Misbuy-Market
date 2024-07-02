import React, { useContext, useEffect, useState } from 'react'
import CategoryBox from './CategoryBox';
import '../style/home.css'
import { TailSpin } from 'react-loader-spinner';
import ItemBox from './ItemBox';
import accessoriesImage from '../images/Accessories.png';
import shoesImage from '../images/Shoes.png';
import clothesImage from '../images/Clothes.png';

function Home() {

  const [pouplerItems, setPouplerItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMostPouplerItems() {
    setLoading(true);
    const url = `http://localhost:3000/api/allItems`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const mostPouplerItems = data.sort((item1, item2) => item2.viewsCounter - item1.viewsCounter).splice(0, 8);
      if (mostPouplerItems.length > 0) {
        setPouplerItems(mostPouplerItems)
        setLoading(false);
      }
    } else {
      setPouplerItems([])
      alert("error fetching!")
    }
  }

  useEffect(() => {
    getMostPouplerItems();
  }, [])

  return (
    <div>
      <h1 className="webTitle">Misbuy Market</h1>
      <div id="categories">
        <CategoryBox category="Shoes" backgroundImage={shoesImage} linkTo="../items/shoes" />
        <CategoryBox category="Clothes" backgroundImage={clothesImage}  linkTo="../items/clothes" />
        <CategoryBox category="Accessories" backgroundImage={accessoriesImage}  linkTo="../items/accessories" />
      </div>
      <h2>poupler items</h2>
      <div className="popularItems">
        {!loading && pouplerItems.map((item) => (
          <ItemBox key={item.id} item={item} />
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

export default Home
