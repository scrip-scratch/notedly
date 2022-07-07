import { gql, useApolloClient } from '@apollo/client';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonAsLink from './ButtonAsLink';


const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const IS_LOGGED_IN = gql`
  query ReadCacheData($id: ID!) {
    cacheData(id: $id) {
      isLoggedIn
    }
  }
`;

function Header () {

  const client = useApolloClient();
  let navigate = useNavigate();

  const isLoggedIn = client.readQuery({
  query: IS_LOGGED_IN
});

  return (
    <HeaderBar>
        <LogoText>NOTEDLY</LogoText>
        <UserState>
          { isLoggedIn || localStorage.getItem('token') ? (
            <ButtonAsLink
              onClick={() => {
                localStorage.removeItem('token');
                client.writeQuery({
                  query: gql`
                    query ReadCacheData($id: Int!) {
                      cacheData(id: $id) {
                          isLoggedIn
                      }
                    }`,
                  data: { 
                  cacheData: {
                      isLoggedIn: false,
                    },
                  }
              });
                navigate('/');
              }}
            >
              Log Out
            </ButtonAsLink>
          ) : (
            <p>
              <Link to={'/signin'}>Sign In</Link> or{' '}
              <Link to={'/signup'}>Sign Up</Link>
            </p>
          )}
        </UserState>
    </HeaderBar>
  )
};

export default Header;