import { BASE_URL_DEV } from "../Utils/globalvariables";

export async function getAllRoles() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL_DEV}/auth/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getAllRoles:', error.message);
  }
}

export async function getAllUsers() {
  console.log('getAllUsers called'); // Log when the function is called

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    console.log('Fetching users with token:', token); // Log the token being used

    const response = await fetch(`${BASE_URL_DEV}/auth/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache'
      }
    });

    console.log('Response status:', response.status); // Log the response status

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Endpoint not found (404)');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('Data received:', data); // Log the received data
    return data;
  } catch (error) {
    console.error('Error in getAllUsers:', error.message); // Log any errors
  }
}

export async function deleteUser(email) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/auth/delete`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Keep the content type as JSON
    },
    body: JSON.stringify(email)  // Send the email as a JSON string
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Server error: ${errorData.errorMessage}`);
  }

  return response.json();
}

export async function addRoleToUser(email, role) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/auth/addroletouser`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, role })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Server error: ${errorData.errorMessage}`);
  }

  return response.json();
}


export async function getCommentsForRecipe(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/comment/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Server error: ${errorData.errorMessage}`);
  }

  return response.json();
}

export async function getAllRecipes() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/recipe`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Server error: ${errorData.errorMessage}`);
  }

  return response.json();
}

export async function deleteComment(commentId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/comment/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(commentId) 
  });
}
export async function deleteRecipe(recipeId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL_DEV}/recipe/${localStorage.getItem('username')}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(recipeId) 
  });
  return response.json();
}