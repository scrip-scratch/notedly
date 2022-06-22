import React, { useEffect } from 'react'
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import UserForm from '../compnents/UserForm';

const SIGNUP_USER = gql`
    mutation sugnUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

function SingUp () {

    let navigate = useNavigate();
    const client = useApolloClient();

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signUp);
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

    useEffect(() =>{
        document.title = 'Sign Up - Notedly'
    })

  return (
    <React.Fragment>
        <UserForm action={signUp} formType='signup' />
        {loading && <p>Loading...</p>}
        {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SingUp