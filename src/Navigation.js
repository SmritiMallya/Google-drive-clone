import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/dashboard">CloudDrive</Link>
      </div>
      <div className="nav-links">
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link 
          to="/upload" 
          className={location.pathname === '/upload' ? 'active' : ''}
        >
          Upload
        </Link>
        <Link 
          to="/share" 
          className={location.pathname === '/share' ? 'active' : ''}
        >
          Share
        </Link>
        <Link 
          to="/profile" 
          className={location.pathname === '/profile' ? 'active' : ''}
        >
          Profile
        </Link>
      </div>
      <div className="nav-user">
        <button onClick={() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
