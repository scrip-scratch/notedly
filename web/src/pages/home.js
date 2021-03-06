import React from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../compnents/NoteFeed';
import Button from '../compnents/Button';
import { GET_NOTES } from '../qql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if(loading) return <p>loading...</p>

  if(error) return <p>error!</p>

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
      <Button
        onClick={() => 
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
        }
      >
        Load more
      </Button>
    )}
    </React.Fragment> 
  );
}


export default Home;