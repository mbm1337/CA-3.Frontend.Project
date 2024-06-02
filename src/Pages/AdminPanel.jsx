import React from 'react';

import Users from '../admin/Users';
import RecipeComments from '../admin/RecipeComments';

function AdminPanel() {
  const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center'
  };

  const sectionStyle = {
    marginBottom: '40px'
  };

  const headerStyle = {
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1>Admin Panel</h1>
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Users</h2>
        <Users />
      </div>
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Opskrifter og kommentar</h2>
        <RecipeComments />
      </div>
    </div>
  );
}

export default AdminPanel;
