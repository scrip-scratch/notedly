import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { gql, useApolloClient } from '@apollo/client';
import Layout from '../compnents/Layout'
import Favorites from './favorites'
import Home from './home'
import MyNotes from './mynotes'
import NotePage from './notes'
import SingUp from './signUp'
import SignIn from './singIn'

const IS_LOGGED_IN = gql`
  query ReadCacheData($id: ID!) {
    cacheData(id: $id) {
      isLoggedIn
    }
  }
`;

// const PrivateRoute = () => {
//     const auth = null; // determine if authorized, from context or however you're doing it

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/login" />;
// }

const PrivateRoute = () =>{

    const client = useApolloClient();
    // const navigate = useNavigate();

    const isLoggedIn = client.readQuery({
        query: IS_LOGGED_IN
      });

    return isLoggedIn ? <Outlet /> : <Navigate replace to='/signin' />
}


const Pages = () => {
    return (
        <Layout>
            <Routes>            
                <Route path="/" element={<Home />} />
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/mynotes" element={<MyNotes />} /> 
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/favorites" element={<Favorites />} /> 
                </Route>
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/signup" element={<SingUp />} />
                <Route path="/signin" element={<SignIn />} />
                
            </Routes>
        </Layout>
    )
}

export default Pages