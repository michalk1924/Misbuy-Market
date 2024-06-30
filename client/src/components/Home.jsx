import React, {useContext, useEffect, useState} from 'react'
import {Token} from './TokenProvider'
import CategoryBox from './CategoryBox';
import '../style/home.css'

function Home() {

  const token = useContext(Token);


  useEffect(() => { console.log("token" + console.log(JSON.stringify(token))) }, [])

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
