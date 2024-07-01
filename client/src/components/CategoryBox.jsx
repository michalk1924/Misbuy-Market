import React from "react"
import { Link } from 'react-router-dom';
import '../style/categoryBox.css'

function CategoryBox(props) {

    return (
        <Link to={`${props.linkTo}`} style={{ textDecoration: "none" }}>
            <div className='categoryBox' style={
                {backgroundImage: `url(${props.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}>
                <h1 style={{}}>{props.category}</h1>
            </div>
        </Link>
    )
}
export default CategoryBox