import { DOMAIN } from "./config";

export const addChallenge = async (jwtToken, bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        },
        body: JSON.stringify(bodyObject)
    };

    try {
        const response = await fetch(`${DOMAIN}/api/v1/challenges`, requestOptions);
        if (response.ok) {
            return [response, '']
        }
        if(response.status === 422){
            return ['', 'Unauthorized user. Cannot add challenge']
        }
        const errorMessage = await response.text()
        return ['', `Server side error ${errorMessage}`]
    } catch (error) {
        return ['', `Server Down: ${error}`]
    }
}

export const loginApi = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    };

    try {
        const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);
        if (response.ok) {
            return [response, '']
        }
        if(response.status === 401)        {
            return ['', 'Invalid email or password.']
        }
        const errorMessage = await response.text()
        return ['', `Server side error ${errorMessage}`]
    } catch (error) {
        return ['', `Server Down: ${error}`]
    }
}

export const logoutApi = async (jwtToken) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken

        },
    };

    try {
        const response = await fetch(`${DOMAIN}/users/sign_out`, requestOptions);
        if (response.ok) {
            return [response, '']
        }
        const errorMessage = await response.text()
        return ['', `Server side error ${errorMessage}`]
    } catch (error) {
        return ['', `Server Down: ${error}`]
    }
}