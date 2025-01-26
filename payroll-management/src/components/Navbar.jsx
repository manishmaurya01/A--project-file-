import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn, handleLogout, handleProfileClick }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Track dropdown visibility

  const navigate = useNavigate();

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile')) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  return (
    <header className="top-nav">
      <div className="project-name">Payroll Management System</div>
      <div className="nav-links">
        <nav>
          <ul>
            <li>
              <a href="/salary-slip">Salary Slip</a>
            </li>
            <li>
              <a href="/leave-application">Leave Application</a>
            </li>
            <li>
              <a href="/tax-declaration">Tax Declaration</a>
            </li>
            <li>
              <div className="profile" onClick={toggleDropdown}>
                {/* Profile icon (use any icon library or custom icon) */}
                <i className="profile-icon"><FontAwesomeIcon icon={faUserCircle} size="2x" /> {/* Profile Icon */}</i>
              </div>
              {isDropdownVisible && (
                <div className="dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <div className="dropdown-item" onClick={handleProfileClick}>Profile</div>
                      <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                    </>
                  ) : (
                    <div className="dropdown-item" onClick={handleProfileClick}>Login</div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
