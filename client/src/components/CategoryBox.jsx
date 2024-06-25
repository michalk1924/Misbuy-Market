import React from "react"
import { Link } from 'react-router-dom';
import '../style/categoryBox.css'

function CategoryBox(props) {
    return (
        <Link to={`${props.linkTo}`} style={{textDecoration:"none"}}>
            <div className='categoryBox' style={{ backgroundColor: props.backgroundColor }}>
                <h1 style={{}}>{props.category}</h1>
            </div>
        </Link>
    )
}
export default CategoryBox