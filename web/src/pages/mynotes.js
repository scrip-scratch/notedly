import React, { useEffect } from 'react'

function MyNotes() {
    useEffect(() => {
        document.title = 'My Notes';
    })
  return (
    <div>MyNotes</div>
  )
}

export default MyNotes