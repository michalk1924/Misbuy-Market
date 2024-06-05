import React from 'react'
import { useState, useEffect } from 'react'
import '../style/items.css'
import ItemBox from './ItemBox'

function Items(){

  const [items, setItems] = useState([])

  async function getItems() {
    const url = `http://localhost:3000/api/electricalProducts`
    const response = await fetch(url)
    const data = await response.json()
    setItems(data)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className="item-list">
      {items.map((item, index) => (
        <ItemBox key={index} item={item} />
      ))}
    </div>
  );
};


export default Items
