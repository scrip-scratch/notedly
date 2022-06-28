import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useApolloClient } from '@apollo/client';
import Layout from '../compnents/Layout'
import Favorites from './favorites'
import Home from './home'
import MyNotes from './mynotes'
import NotePage from './notes'
import SingUp from './signUp'
import SignIn from './singIn'
import NewNote from './news';
import { IS_LOGGED_IN } from '../qql/query';
import EditNote from './edit';


const PrivateRoute = () =>{

    const client = useApolloClient();

    const isLoggedIn = client.readQuery({
        query: IS_LOGGED_IN
      });

    return isLoggedIn || localStorage.getItem('token') ? <Outlet /> : <Navigate replace to='/signin' />
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
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/new" element={<NewNote />} /> 
                </Route>  
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/edit/:id" render={props => {<EditNote />}} /> 
                </Route>              
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/signup" element={<SingUp />} />
                <Route path="/signin" element={<SignIn />} />
                
            </Routes>
        </Layout>
    )
}

export default Pages