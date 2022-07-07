import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import NoteForm from '../compnents/NoteForm';
import { GET_MY_NOTES, GET_NOTES } from '../qql/query';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoriteBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const NewNote = props => {

    useEffect(() => {
        document.title = 'New Note - Notedly';
    })

    const [data, {loading, error}] = useMutation(NEW_NOTE, {
      refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
      onComplited: data => {
        props.history.push(`note/${data.newNote.id}`);
      }
    })

  return (
    <React.Fragment>
      {loading && <p>loading ...</p>}
      {error && <p>Error saving the note!</p>}
      <NoteForm action={data}/>
    </React.Fragment>
  )
};

export default NewNote;