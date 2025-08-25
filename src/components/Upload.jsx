import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile  } from './apiService';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('You need to be logged in to upload files.');
            navigate('/login');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem('authToken');
        setUploading(true);
        setUploadProgress(0);
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            try {
                const response = await uploadFile(file, token);
                alert(`File "${file.name}" uploaded successfully!`);
                setUploadProgress(((i + 1) / selectedFiles.length) * 100);
            } catch (error) {
                alert(error.message);
            }
        }
        setUploading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Files</h1>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required
                    />
                </div>
                {file && (
                    <p className="text-sm text-gray-600 mb-4">Selected file: <span className="font-medium">{file.name}</span></p>
                )}
                <button
                    onClick={handleUpload}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={uploading || !file} // Disable if uploading or no file selected
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default Upload;
