import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile  } from './apiService';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState(null); // For displaying current profile image
    const [newImageFile, setNewImageFile] = useState(null); // For the new file to upload
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                alert('You need to be logged in to view your profile.');
                navigate('/login');
                return;
            }

            try {
                // Replace '/api/profile' with your actual backend profile endpoint
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Send the token
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch user data');
                }

                setName(data.user.name || '');
                setEmail(data.user.email || '');
                // Assuming your backend returns a profile image URL
                setProfileImage(data.user.profileImageUrl || null);
            } catch (error) {
                alert('Error fetching profile: ' + error.message);
                // Optionally redirect to login if token is invalid/expired
                if (error.message.includes('Failed to fetch') || error.message.includes('Unauthorized')) {
                     navigate('/login');
                }
            }
        };
        fetchUser();
    }, [navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('Not authenticated.');
            return;
        }

        try {
            // Update user name/email
            const updateResponse = await fetch('/api/profile', { // Replace with your actual backend update endpoint
                method: 'PUT', // Or PATCH
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ name }), // Only sending name for now, email usually not updatable directly
            });

            const updateData = await updateResponse.json();

            if (!updateResponse.ok) {
                throw new Error(updateData.message || 'Failed to update profile');
            }

            alert('Profile updated successfully!');

            // Handle image upload if a new file is selected
            if (newImageFile) {
                const formData = new FormData();
                formData.append('profileImage', newImageFile); // 'profileImage' should match backend's expected field name

                const imageUploadResponse = await fetch('/api/upload-profile-image', { // Replace with your image upload endpoint
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        // 'Content-Type': 'multipart/form-data' is automatically set by fetch with FormData
                    },
                    body: formData,
                });

                const imageData = await imageUploadResponse.json();

                if (!imageUploadResponse.ok) {
                    throw new Error(imageData.message || 'Failed to upload profile image');
                }

                setProfileImage(imageData.imageUrl); // Assuming backend returns the new image URL
                setNewImageFile(null); // Clear the selected file
                alert('Profile image updated successfully!');
            }

        } catch (error) {
            alert('Error updating profile: ' + error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            // Create a local URL for immediate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set for local preview
            };
            reader.readAsDataURL(file);
        } else {
            setNewImageFile(null);
            // If no file selected, revert to original image or clear preview
            // You might want to refetch user data here to get the original image URL
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
            <form onSubmit={handleProfileUpdate} className="mt-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        // Email is typically read-only or requires a separate verification process
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/*"
                    />
                </div>
                {profileImage && (
                    <div className="mb-6 text-center">
                        <img
                            src={profileImage}
                            alt="Profile Preview"
                            className="mt-4 mx-auto rounded-full w-32 h-32 object-cover border-2 border-gray-300 shadow-sm"
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
