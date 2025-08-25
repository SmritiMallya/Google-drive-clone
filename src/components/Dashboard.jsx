import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // Basic authentication check: Redirect to login if no token is found
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('You need to be logged in to access the dashboard.');
            navigate('/login'); // Redirect to login page
        }
    }, [navigate]); // Add navigate to dependency array to avoid lint warnings

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the authentication token
        alert('Logged out successfully!');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-6">Welcome back! Here are your options:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                    to="/profile"
                    className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                >
                    Profile
                </Link>
                <Link
                    to="/upload"
                    className="flex items-center justify-center bg-green-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-lg font-semibold"
                >
                    Upload Files
                </Link>
                <Link
                    to="/share"
                    className="flex items-center justify-center bg-purple-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 text-lg font-semibold"
                >
                    Share Files
                </Link>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
