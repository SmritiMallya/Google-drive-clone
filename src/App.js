import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Share from './components/Share';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Router>
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/dashboard" />} />
                    <Route path="/share" element={isAuthenticated ? <Share /> : <Navigate to="/dashboard" />} />
                    <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                </Router>
            </div>
        </Router>
    );
};

export default App;
