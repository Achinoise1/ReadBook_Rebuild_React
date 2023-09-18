import '../css/App.css';
import '../css/bootstrap.css';
import '../css/ion.rangeSlider.min.css';
import '../css/responsive.css';
import '../css/style.css';
import '../css/style.css.map';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './Home.js';
import Book from './Book.js';
import Test from './Test.js';
import BookDetail from './BookDetail';
import TestStart from './TestStart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<Book />} />
            <Route path='/bookDetail' element={<BookDetail />} />
            <Route path='/test' element={<Test />} />
            <Route path='/testStart/*' element={<TestStart />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;