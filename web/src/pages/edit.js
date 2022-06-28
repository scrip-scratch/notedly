import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import NoteForm from '../compnents/NoteForm';
import { EDIT_NOTE } from '../qql/mutation';
import { GET_ME, GET_NOTE } from '../qql/query';

const EditNote = props => {
    const id = props.match.params.id;
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_NOTE, { variables: {id}});

    const { data: userdata } = useQuery(GET_ME);

    const [editNote] = useMutation(EDIT_NOTE, {
        variables:{
            id
        },
        onCompleted: () => {
            navigate(`/note/${id}`);
        }
    })


    if (loading) return 'Loading...';
    if (error) return <p>Error! Note Not Found</p>

    if (userdata.me.id !== data.note.author.id) {
        return <p>You dont have access to edit this note</p>
    }
  return (
    <NoteForm content={data.note.content} action={editNote} />
  )
}

export default EditNote;