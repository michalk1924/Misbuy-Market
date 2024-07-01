import { React, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../style/categoryItems.css'
import ItemBox from './ItemBox';
import Filters from "./Filters";
import { TailSpin } from 'react-loader-spinner';

function CategoryItems() {

    const limit = 8

    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([])
    const { category } = useParams();
    const [start, setStart] = useState(0)
    const [thereMoreItems, setThereMoreItems] = useState(true)
    const [loading, setLoading] = useState(true)

    async function getItems() {
        console.log(category);
        const url = `http://localhost:3000/api/${category}?_start=${start}&_limit=${limit}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                setAllItems(items.concat(await data))
                console.log(data);
                setLoading(false);
                setStart(prevStart => prevStart + limit)
            }
            if (data.length < limit) {
                setThereMoreItems(false)
            }
        } else {
            setAllItems([])
            alert("error fetching!")
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div id='categoryItems'>
            {!loading && <Filters setItems={setItems} allItems={allItems} category={category} />}
            <div className="item-list">
                {!loading && items.map((item, index) => (
                    <ItemBox key={item.id} item={item} />
                ))}
                {loading && (
                    <div className="loading-spinner">
                        <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
                    </div>
                )}
                {thereMoreItems && !loading && <button onClick={getItems}>⏬</button>}
            </div>
        </div>
    )
}
export default CategoryItems