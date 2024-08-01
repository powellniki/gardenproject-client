const API_URL = 'https://gardenapi-app-8s8tg.ondigitalocean.app';


export const getGardenerById = async (gardenerId) => {
    const url = `${API_URL}/profiles/${gardenerId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}


export const editProfile = async (formData, gardenerId) => {
    const url = `${API_URL}/profiles/${gardenerId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: formData
        });
        if (!response.ok) {
            throw Error(response.status);
        } 
        return response
    } catch (error) {
        if (error.message === '401') {
            window.location.href = "/login"
          }
          if (error.message === '404') {
            throw Error(err.message);
          }
    }
}