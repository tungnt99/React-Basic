import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './App';
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Dashboard from './components/Admin/Contents/Dashboard/Dashboard';
import ManageUsers from './components/Admin/Contents/ManageUser/ManageUsers';
import Login from './components/Auth/Login';
export default function Layout() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route exact path="/user" element={<User />} />
                </Route>
                <Route exact path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route exact path="manage-user" element={<ManageUsers />} />
                </Route>
                <Route exact path='/login' element={<Login />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
