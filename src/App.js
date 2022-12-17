import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import User from './components/User/User';
import Admin from './components/Admin/Admin';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <div className='header'>
          <Header />
        </div>
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/admin" element={<Admin />} />

          </Routes>
        </div>
      </div>

    </Router>
  )
}

