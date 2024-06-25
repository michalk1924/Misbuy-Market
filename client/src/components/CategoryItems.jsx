import { React, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../style/categoryItems.css'
import ItemBox from './ItemBox';

function CategoryItems() {

    const [items, setItems] = useState([]);
    const { category } = useParams();

    async function getItems() {
        console.log(category);
        const url = `http://localhost:3000/api/${category}`;
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className="item-list">
            {items.map((item, index) => (
                <ItemBox key={item.id} item={item} />
            ))}
        </div>
    )
}
export default CategoryItems