import React from 'react'
import { useParams } from 'react-router-dom'

function Item() {
    const { itemId } = useParams()
  return (
    <div>
      Item {itemId}
    </div>
  )
}

export default Item
