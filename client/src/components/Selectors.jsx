import React from "react";
import SingleSelector from "./SingleSelector";
import { useEffect } from "react";
function Selectors(props) {
  const {selectors, handleChange} =props;

useEffect(()=>{
    console.log(selectors);
},[])
  return (
    <div>
      {selectors.map((selector, index) => (
        <SingleSelector key={index} title={selector.title} options={selector.options} handleChange={handleChange}/>
      ))}
    </div>
  );
}

export default Selectors;
