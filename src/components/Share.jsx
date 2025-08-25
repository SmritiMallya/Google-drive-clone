import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shareFile  } from './apiService';

const Share = () => {
    const [fileLink, setFileLink] = useState('');
    const [shareEmail, setShareEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('You need to be logged in to share files.');
            navigate('/login');
        }
    }, [navigate]);

    const handleShare = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await shareFile(fileName, email, token);
            alert(`File "${fileName}" shared with ${email} successfully!`);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Share Files</h1>
            <form onSubmit={handleShare} className="mt-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">File Link</label>
                    <input
                        type="text"
                        value={fileLink}
                        onChange={(e) => setFileLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter file link (e.g., https://yourdomain.com/files/document.pdf)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Share with Email</label>
                    <input
                        type="email"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter recipient's email"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Share
                </button>
            </form>
        </div>
    );
};

export default Share;
