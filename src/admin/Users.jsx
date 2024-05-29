import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getAllRoles, addRoleToUser } from '../service/adminapi';

function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      const usersData = await getAllUsers();
      const rolesData = await getAllRoles();
      setUsers(usersData);
      setRoles(rolesData);
    };
    fetchUsersAndRoles();
  }, []);

  const handleDelete = async (email) => {
    try {
      await deleteUser(email);
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddRole = async (email, role) => {
    try {
      await addRoleToUser(email, role);
      // Refresh the user list after updating the role
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error adding role to user:', error);
    }
  };

  const containerStyle = {
    width: '80%',
    margin: 'auto',
    padding: '20px'
  };

  const sectionStyle = {
    marginBottom: '40px'
  };

  const headerStyle = {
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    borderRadius: '4px'
  };

  const spanStyle = {
    flexGrow: 1
  };

  const buttonStyle = {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff1a1a'
  };

  return (
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <h2 style={headerStyle}>Users</h2>
        <ul style={listStyle}>
          {users.map(user => (
            <li key={user.email} style={itemStyle}>
              <span style={spanStyle}>{user.email}</span>
              <select
                defaultValue={user.rolesAsStrings[0]} // Set the default value to the user's current role
                onChange={e => handleAddRole(user.email, e.target.value)} // Update the role when a new option is selected
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                style={buttonStyle}
                onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={() => handleDelete(user.email)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Users;
