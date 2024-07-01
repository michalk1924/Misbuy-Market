import { React, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../style/categoryItems.css'
import ItemBox from './ItemBox';
import Filters from "./Filters";
function CategoryItems() {

    const limit = 8

    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
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
            console.log(data);
            if (data.length > 0) {
                await updateAllItems(data);  // חכה לסיום של updateAllItems(data)
                //console.log(allItems);  // תוכל לראות את הנתונים המלאים כאן
                //setLoading(updateAllItems(data));
                //console.log(updateAllItems(data));
                setStart(prevStart => prevStart + limit);
            }
            if (data.length < limit) {
                setThereMoreItems(false)
            }
        } else {
            setItems([])
            alert("error fetching!")
        }
    }

    async function updateAllItems(data) {
        return new Promise((resolve, reject) => {
            try {
                setAllItems(prevAllItems => {
                    return [...prevAllItems, ...data];
                });
                resolve(allItems);
                return false;
            } catch (error) {
                reject(error);
            }
        });
    }

    
    useEffect(() => {
        console.log("Updated allItems:", allItems);
        setLoading(false);
    }, [allItems]);

    useEffect(() => {
        setLoading(true);
        getItems();
    }, []);

    return (
        <div>
            {!loading && <Filters setItems={setItems} allItems={allItems} category={category} />}
            <div className="item-list">
                {!loading && items.map((item, index) => (
                    <ItemBox key={item.id} item={item} />
                ))}
                {loading && '🔃'}
                {thereMoreItems && !loading && <button onClick={getItems}>⏬</button>}
            </div>
        </div>
    )
}
export default CategoryItems