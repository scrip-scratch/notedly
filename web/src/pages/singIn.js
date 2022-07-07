import React, { useEffect } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import UserForm from '../compnents/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = () => {

    useEffect( () => {
        document.title = 'Sing In - Notedly'
    })
    const navigate = useNavigate();
    const client = useApolloClient();

    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn);
            client.writeQuery({
                query: gql`
                  query ReadCacheData($id: Int!) {
                    cacheData(id: $id) {
                        isLoggedIn
                    }
                  }`,
                data: { 
                cacheData: {
                    isLoggedIn: true,
                  },
                }
            });
            navigate('/');
        }
    })

  return (
    <React.Fragment>
        <UserForm action={signIn} formType='signIn' />
        {loading && <p>Loading ...</p>}
        {error && <p>Error signing in!</p>}
    </React.Fragment>
  )
};

export default SignIn;