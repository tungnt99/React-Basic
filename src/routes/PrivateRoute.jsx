import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
export default function PrivateRoute(props) {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>
    }
    // console.log(isAuthenticated);
    return (
        <>
            {props.children}
        </>
    )
}
