import React from "react";
import { useEffect } from "react";
function SingleSelector(props) {
    const { title, options, handleChange } = props;
    return (
        <div>
            <label className="addItemLabel" htmlFor={title}>{title}</label>
            <select className="addItemInput" id={title} name={title} onChange={handleChange}>
                <option value=""></option>
                {options.map((option, index) => (
                    <option key={index} value={option}> {option} </option>
                ))}
            </select>
        </div>
    );
}

export default SingleSelector;
