import React, {useContext, useEffect, useState} from 'react'
import CategoryBox from './CategoryBox';
import '../style/home.css'

function Home() {

  return (
    <div>
      <h1 id="title">Misbuy Market</h1>
      <div id="categories">
        <CategoryBox category="Shoes" backgroundColor="black" linkTo="../items/shoes"/>
        <CategoryBox category="Clothes" backgroundColor="black" linkTo="../items/clothes"/>
        <CategoryBox category="Accessories" backgroundColor="black" linkTo="../items/accessories"/>
      </div>
    </div>
  )
}

export default Home
