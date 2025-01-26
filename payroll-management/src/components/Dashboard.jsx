// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Firebase import
import Navbar from "./Navbar"; // Import the Navbar component

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      navigate("/");
    });
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/profile"); // Go to profile page if logged in
    }
  };

  return (
    <div className="dashboard">
      {/* Use Navbar Component */}
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleProfileClick={handleProfileClick}
      />

      {/* Main Content */}
      <div className="main-container">
        <div className="body">
          <h2>Welcome to the Dashboard</h2>
          <p>Select a section from the navbar to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
