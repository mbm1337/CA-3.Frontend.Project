import { BASE_URL_DEV } from "../Utils/globalvariables";


export const login = async (username, password) => {
    try {
        const result = await fetch (`${BASE_URL_DEV}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        if (!result.ok) {
            throw new Error(`Login failed with status: ${result.status}`);
        }

        const data = await result.json();
        console.log(data);
        return data; // Return data from the function
    } catch (e) {
        console.log(e);
        throw e; // Re-throw the error so it can be caught and handled in the calling code
    }
}

export const register = async (username, password) => {
    try {
        const result = await fetch (`${BASE_URL_DEV}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        if (!result.ok) {
            throw new Error(`Registration failed with status: ${result.status}`);
        }

        const data = await result.json();
        console.log(data);
        return data; // Return data from the function
    } catch (e) {
        console.log(e);
        throw e; // Re-throw the error so it can be caught and handled in the calling code
    }
}


