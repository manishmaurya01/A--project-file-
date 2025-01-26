import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './firebase'; // Firebase authentication import
import { onAuthStateChanged } from "firebase/auth";
import Auth from './components/Auth'; // Auth component
import Dashboard from './components/Dashboard'; // Dashboard component
import SalarySlip from './components/SalarySlip'; // Salary Slip component
import LeaveApplication from './components/LeaveApplication'; // Leave Application component
import TaxDeclaration from './components/TaxDeclaration'; // Tax Declaration component
import Profile from './components/Profile'; // Profile component
import './App.css'; // Import your app styles
import EditProfile from "./components/EditProfile";
import Attendance from "./components/Attendance";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe; // Cleanup on component unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/salary-slip" element={isLoggedIn ? <SalarySlip /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/leave-application" element={isLoggedIn ? <LeaveApplication /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/tax-declaration" element={isLoggedIn ? <TaxDeclaration /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
};

export default App;
