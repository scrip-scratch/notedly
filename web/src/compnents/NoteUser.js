import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_ME } from '../qql/query'
import DeleteNote from './DeleteNote'

const NoteUser = props => {

  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <React.Fragment>
      <br />
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.note.id}`} props={props}>Edit</Link> <br />
          <DeleteNote noteId={props.note.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default NoteUser