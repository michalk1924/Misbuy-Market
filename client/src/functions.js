
export async function addToWishList(event, userId, itemId, token){
    event.stopPropagation();
    if(userId == null){
        alert('you must be logged in')
        return false;
    }
    event.stopPropagation();
    try{
      const url = `http://localhost:3000/api/users/${userId}/update-wishlist`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({itemId: itemId})
      });
      if(response.ok)
        alert("Item added to wishlist");
    }
    catch(error){
      alret("Error adding item to wishlist");
    }
  }