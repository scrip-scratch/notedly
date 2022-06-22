import React, { useEffect } from 'react'

function Favorites() {
    useEffect(() => {
        document.title = 'Favorites';
    })
  return (
    <div>Favorites</div>
  )
}

export default Favorites