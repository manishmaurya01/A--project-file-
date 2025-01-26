import React from "react";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveComponent('home')}>Home</li>
        <li onClick={() => setActiveComponent('add-user')}>Add User</li>
        <li onClick={() => setActiveComponent('view-users')}>View Users</li>
        {/* Add more items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
