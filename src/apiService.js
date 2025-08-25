const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

// Function to handle user login
export const loginUser  = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json(); // Returns the response data
};

// Function to handle user signup
export const signupUser  = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }

    return await response.json(); // Returns the response data
};

// Function to upload files
export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'File upload failed');
    }

    return await response.json(); // Returns the response data
};

// Function to share files
export const shareFile = async (fileLink, shareEmail, token) => {
    const response = await fetch(`${API_BASE_URL}/share-file`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fileLink, shareEmail }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'File sharing failed');
    }

    return await response.json(); // Returns the response data
};

// Function to get user profile
export const getUserProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
    }

    return await response.json(); // Returns the response data
};
