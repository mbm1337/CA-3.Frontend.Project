import React from 'react';

import Users from '../admin/Users';
import RecipeComments from '../admin/RecipeComments';

function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Users</h2>
        <Users />
      </div>
     
   
      <div>
        <h2>Opskrifter og kommentar</h2>
        <RecipeComments />
      </div>
   
    </div>
  );
}

export default AdminPanel;