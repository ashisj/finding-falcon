import React from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from './Router';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Router/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
