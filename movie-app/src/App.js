import React from 'react';
import "./App.css";
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import { Route } from 'react-router-dom';
import styled from "styled-components";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        {/* <Container> */}
          <Routes>
            <Route eaxct path="/" element={<Trending />} />
            <Route exact path="/movies" element={<Movies />}/>
            <Route eaxct path="/series" element={<Series />}/>
            <Route exact path="/search" element={<Search />}/>
          </Routes>

        {/* </Container> */}
      </div>
      
    </BrowserRouter>
  )
}

export default App