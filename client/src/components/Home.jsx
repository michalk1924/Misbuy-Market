import React, {useContext, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import {Token} from './UserContext'

function Home() {

  //const { state } = useLocation()
  const token = useContext(Token);

  useEffect(() => {console.log("token" + token);}, [])

  return (
    <div>
      Home:
    </div>
  )
}

export default Home
