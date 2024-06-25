import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Token } from './TokenProvider'
import ItemBox from './ItemBox';

function Home() {

  //const { state } = useLocation()
  const token = useContext(Token);

  const [items, setItems] = useState([]);

  useEffect(() => { console.log("token" + console.log(JSON.stringify(token))) }, [])

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const url = 'http://localhost:3000/api/allItems';
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  }

  return (
    <div>
      <div className="item-list">
        {items.map((item, index) => (
          <ItemBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Home
