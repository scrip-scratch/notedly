import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_MY_NOTES } from '../qql/query';
import NoteFeed from '../compnents/NoteFeed';

function MyNotes() {
    useEffect(() => {
        document.title = 'My Notes';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data.me.notes.length !== 0) {
      return <NoteFeed notes={data.me.notes} />
    } else {
      return <p>No notes yet!</p>
    }
}

export default MyNotes;