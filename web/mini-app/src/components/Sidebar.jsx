import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h5>Menu</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/profile" 
          className={location.pathname === '/profile' ? 'active' : ''}
        >
          Profile
        </Nav.Link>
      </Nav>
      
      <div className="sidebar-footer">
        <div className="user-info mb-3">
          <small><strong>{user?.firstName} {user?.lastName}</strong></small>
          <br />
          <small className="text-muted">{user?.email}</small>
        </div>
        <button 
          className="btn btn-danger btn-sm w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
