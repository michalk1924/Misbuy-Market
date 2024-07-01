import React, {useContext, useEffect, useState} from 'react'
import CategoryBox from './CategoryBox';
import '../style/home.css'
import { TokenContext } from './TokenProvider';
import { UserContext } from './UserProvider';


function Home() {

  const { token } = useContext(TokenContext);

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
