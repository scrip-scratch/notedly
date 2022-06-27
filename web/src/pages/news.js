import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import NoteForm from '../compnents/NoteForm'

const NewNote = () => {
    useEffect(() => {
        document.title = 'New Note - Notedly';
    })
 
  return (
    <NoteForm />
  )
}

export default NewNote