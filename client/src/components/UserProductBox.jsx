import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import '../style/userProductBox.css'

function UserProductBox({item}) {
    return (
        <div className="item-box">
            <img src={item.image} alt="image item" />
            <div id="shortDescription">
                <p><b>{item.title}</b></p>
                <FontAwesomeIcon icon={faEye} className='icon' title="see more" onClick={()=>{alert("hi")}}/>
                <FontAwesomeIcon icon={faPen} className='icon' title="update" onClick={()=>{alert("hi")}}/>
            </div>
        </div>
    )
}
export default UserProductBox;