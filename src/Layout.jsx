import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './App';
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Dashboard from './components/Admin/Contents/Dashboard/Dashboard';
import ManageUsers from './components/Admin/Contents/ManageUser/ManageUsers';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Contents/ManageQuiz/ManageQuiz';
import Questions from './components/Admin/Contents/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './components/Profile/Profile';
const NotFound = () => {
    return(
      <div className="container mt-3 alert alert-danger">
        404.Not found data with your current URL
      </div>
    )
  }
export default function Layout() {
    return (
        <>
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <Routes>
                    <Route exact path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route exact path="/user" element={<PrivateRoute><User/></PrivateRoute>} />
                        <Route exact path="/user/quiz/:id" element={<DetailQuiz />} />
                        <Route exact path="/profile" element={<Profile />} />
                    </Route>
                    <Route exact path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
                        <Route index element={<Dashboard />} />
                        <Route exact path="manage-user" element={<ManageUsers />} />
                        <Route exact path="manage-quiz" element={<ManageQuiz />} />
                        <Route exact path="manage-question" element={<Questions />} />
                    </Route>
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path="*" element={<NotFound />} />
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

            </Suspense>
        </>
    )
}
