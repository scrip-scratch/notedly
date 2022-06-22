import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
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



const PrivateRoute = ({ component: Component, ...rest }) =>{

    const client = useApolloClient();
    // const navigate = useNavigate();

    const isLoggedIn = client.readQuery({
        query: IS_LOGGED_IN
      });
    
    return <Route {...rest} render={(props) => (
        isLoggedIn
            ? <Component {...props} />
            : <Navigate replace to='/signin' />
        )} 
    />

}

// const PrivateRoute = ({ component: Component, handleChildFunc, ...rest }) => {
//     const user = "token from cookie";
//     return <Route {...rest} render={(props) => (
//         user !== null
//             ? <Component {...props} user={user} handleChildFunc={handleChildFunc}/>
//             : <Redirect to='/login' />
//         )} 
//     />
// }

const Pages = () => {
    return (
        <Layout>
            <Routes>            
                <Route path="/" element={<Home />} />
                <PrivateRoute path="/mynotes" element={<MyNotes />} />
                <PrivateRoute path="/favorites" element={<Favorites />} />
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/signup" element={<SingUp />} />
                <Route path="/signin" element={<SignIn />} />
                
            </Routes>
        </Layout>
    )
}

export default Pages