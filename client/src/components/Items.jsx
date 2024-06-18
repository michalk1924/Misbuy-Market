import React from 'react';
import { useState, useEffect } from 'react';
import '../style/items.css';
import ItemBox from './ItemBox';

function Items() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState({ price: [0, 500], type: [], area: [] });

  const [selectSort, setSelectSort] = useState('serial');

  // Define filters object with functions for each searchValue property
  const filters = {
    price: (item, priceRange) => item.price >= priceRange[0] && item.price <= priceRange[1],
    type: (item, types) => types.length === 0 || types.includes(item.type),
    area: (item, areas) => areas.length === 0 || areas.includes(item.area),
    // Add new filter functions here (e.g., brand, color)
  };

   const selectSortOptions = {
    up: (item1, item2) => item1.price - item2.price,
    down: (item1, item2) => item2.price - item1.price,
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    const filteredItems = applyFilter(allItems, searchValue);
    setItems(filteredItems);
  }, [searchValue, allItems]);

  useEffect(() => {
    setItems((prevItems) => {
      return [...prevItems].sort(selectSortOptions[selectSort])
    })
  }, [selectSort, searchValue, allItems]);

  async function getItems() {
    const url = 'http://localhost:3000/api/electricalProducts';
    const response = await fetch(url);
    const data = await response.json();
    setAllItems(data);
  }

  const applyFilter = (items, searchValue) => {
    return items.filter((item) => {
      // Iterate over each searchValue property and apply the corresponding filter function
      for (const [key, value] of Object.entries(searchValue)) {
        if (!filters[key](item, value)) {
          return false; // Discard the item if any filter fails
        }
      }
      return true; // All filters passed, keep the item
    });
  };

  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const form = checkbox.closest('form'); // Get the closest parent form element
    const filterType = form.getAttribute('name'); // Get the name of the form
    setSearchValue((prevSearchValue) => ({
      ...prevSearchValue,
      [filterType]:
        prevSearchValue[filterType].includes(event.target.value) ? prevSearchValue[filterType].filter((t) => t !== event.target.value)
          : [...prevSearchValue[filterType], event.target.value]
    }))
  };


  const handleRangeChange = (event) => {
    setSearchValue((prevSearchValue) => ({
      ...prevSearchValue,
      [event.target.name]: [0, parseInt(event.target.value)]
    }))
  };

  const handleSelectChange = (event) => {
    setSelectSort(event.target.value);
  };

  // Sort logic remains the same (selectSortOptions object)

  return (
    <div>
      {/* Search controls */}
      <div>
        <label htmlFor="price">Price: up to {searchValue.price[1]}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={searchValue.price[1]} // Use upper bound for slider
          id="myRange"
          onChange={handleRangeChange}
          name="price"
        />

        {/* Type checkboxes */}
        <form onChange={handleCheckboxChange} name="type">
          <input type="checkbox" id="type1" value="Bike" />
          <label htmlFor="type1">Bike</label>
          <br />
          <input type="checkbox" id="type2" value="Car" />
          <label htmlFor="type2">Car</label>
          <br />
          <input type="checkbox" id="type3" value="Boat" />
          <label htmlFor="type3">Boat</label>
        </form>

        {/* Area checkboxes (similar to type) */}
        <form onChange={handleCheckboxChange} name="area">
          <input type="checkbox" id="type1" value="fff" />
          <label htmlFor="type1">fff</label>
          <br />
          <input type="checkbox" id="type2" value="Car" />
          <label htmlFor="type2">Car</label>
          <br />
          <input type="checkbox" id="type3" value="Boat" />
          <label htmlFor="type3">Boat</label>
        </form>
      </div>

      {/* sort */}
      <div>
        <label htmlFor="sort">
          Select Category:
        </label>
        <select id="sort" name="category" onChange={handleSelectChange}>
          <option value="up">low to high</option>
          <option value="down">high to low</option>
        </select>
      </div>

      {/* Item list */}
      <div className="item-list">
        {items.map((item, index) => (
          <ItemBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};


export default Items
