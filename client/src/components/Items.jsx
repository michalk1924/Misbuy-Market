import React from 'react';
import { useState, useEffect } from 'react';
import '../style/items.css';
import ItemBox from './ItemBox';
import Filters from './Filters';

function Items() {
  const [items, setItems] = useState([]);

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
      <Filters setItems={setItems} allItems={items}/>
      <div className="item-list">
        {items.map((item, index) => (
          <ItemBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};


export default Items
