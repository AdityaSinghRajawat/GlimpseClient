import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  const c_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (

    <GoogleOAuthProvider clientId={c_id}>
      <BrowserRouter>

        <Container maxWidth="xl">
          <Navbar />

          <Routes>
            <Route path="/" exact Component={() => <Navigate to='/posts' />} />
            <Route path="/posts" exact Component={Home} />
            <Route path="/posts/search" exact Component={Home} />
            <Route path="/posts/:id" exact Component={PostDetails} />
            <Route path="/auth" exact Component={() => (user ? <Navigate to='/posts' /> : <Auth />)} />
          </Routes>

        </Container>

      </BrowserRouter>
    </GoogleOAuthProvider>


  );
}

export default App;
