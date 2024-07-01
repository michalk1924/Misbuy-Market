import React, { useState, useEffect } from 'react';
import '../style/items.css';

function Filters({ allItems, setItems, category }) {

    const [searchValue, setSearchValue] = useState({ price: [0, 500], type: [], area: [] });
    const [selectSort, setSelectSort] = useState('');

    const filters = {
        price: (item, priceRange) => item.price >= priceRange[0] && item.price <= priceRange[1],
        type: (item, types) => types.length === 0 || types.includes(item.type),
        area: (item, areas) => areas.length === 0 || areas.includes(item.area),
    };

    const selectSortOptions = {
        up: (item1, item2) => item1.price - item2.price,
        down: (item1, item2) => item2.price - item1.price,
    };

    const typesSelectors = {
        shoes: [
            { title: "type", options: ["sneakers", "boots", "sandals", "loafers", "heels", "flats", "oxfords", "slippers", "espadrilles", "flip-flops", "wedges", "moccasins", "athletic shoes", "pumps", "platforms", "mary janes"] },
            { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
            { title: "size", options: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48] }
        ],
        clothes: [
            { title: "type", options: ["t-shirt", "shirt", "blouse", "tank top", "sweater", "hoodie", "jacket", "coat", "dress", "skirt", "jeans", "trousers", "shorts", "leggings", "suit", "tie", "scarf", "gloves", "hat", "socks", "swimsuit", "robe", "pajamas"] },
            { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] },
            { title: "size", options: ["XS", "S", "M", "L", "XL", "XXL"] }
        ],
        accessories: [
            { title: "type", options: ["necklace", "bracelet", "ring", "earrings", "watch", "belt", "scarf", "hat", "sunglasses", "gloves", "handbag", "backpack", "wallet", "tie", "bow tie", "hairpin", "headband", "umbrella"] },
            { title: "color", options: ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "white"] }
        ]
    };

    const applyFilter = (searchValue) => {
        return allItems.filter((item) => {
            for (const [key, value] of Object.entries(searchValue)) {
                if (!filters[key](item, value)) {
                    return false;
                }
            }
            return true;
        });
    };

    useEffect(() => {
        const filteredItems = applyFilter(searchValue);
        const sortedItems = filteredItems.sort(selectSortOptions[selectSort]);
        setItems(sortedItems);
    }, [searchValue, allItems]);

    useEffect(() => {
        setItems(prevItems => prevItems.sort(selectSortOptions[selectSort]));
    }, [selectSort]);

    const handleCheckboxChange = (event) => {
        const checkbox = event.target;
        const form = checkbox.closest('form');
        const filterType = form.getAttribute('name');
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            [filterType]:
                prevSearchValue[filterType].includes(event.target.value) ? prevSearchValue[filterType].filter((t) => t !== event.target.value)
                    : [...prevSearchValue[filterType], event.target.value]
        }));
    };

    const handleRangeChange = (event) => {
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            [event.target.name]: [0, parseInt(event.target.value)]
        }));
    };

    const handleSelectChange = (event) => {
        setSelectSort(event.target.value);
    };

    return (
        <div>
            <div id='selectSort'>
                <label htmlFor="sort">sort by:</label>
                <select id="sort" name="category" onChange={handleSelectChange}>
                    <option value="up">low to hight</option>
                    <option value="down">hogh to low</option>
                </select>
            </div>

            <div id='searchControls'>
                <label htmlFor="price">price up to: {searchValue.price[1]}</label>
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={searchValue.price[1]}
                    id="myRange"
                    onChange={handleRangeChange}
                    name="price"
                />

                {typesSelectors[category].map((filter) => (
                    <form key={filter.title} onChange={handleCheckboxChange} name={filter.title}>
                        <h4>{filter.title}</h4>
                        {filter.options.map(option => (
                            <div key={option}>
                                <input type="checkbox" id={`${filter.title}-${option}`} value={option} />
                                <label htmlFor={`${filter.title}-${option}`}>{option}</label>
                            </div>
                        ))}
                    </form>
                ))}

                <form onChange={handleCheckboxChange} name="area">
                    <input type="checkbox" id="area1" value="jerusalem" />
                    <label htmlFor="type1">jerusalem</label>
                    <br />
                    <input type="checkbox" id="area12" value="TLV" />
                    <label htmlFor="type2">TLV</label>
                    <br />
                    <input type="checkbox" id="area3" value="Elad" />
                    <label htmlFor="type3">Elad</label>
                </form>
            </div>
        </div>
    );
}

export default Filters;
