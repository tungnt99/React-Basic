import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Dashboard from './components/Admin/Contents/Dashboard/Dashboard';
import ManageUsers from './components/Admin/Contents/ManageUser/ManageUsers';
import Login from './components/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route exact path="/user" element={<User />} />
        </Route>
        <Route exact path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route exact path="manage-user" element={<ManageUsers />} />
        </Route>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
