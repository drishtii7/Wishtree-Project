import React from 'react';
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Userdash from './Userdash';
import Admindashboard from './Admindashboard';

function Routing(){
    return(
        <>
        <BrowserRouter>
        <ul>
        </ul>
       
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/userdash" element={<Userdash/>}/>
            <Route path="/admin" element={<Admindashboard/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default Routing;

