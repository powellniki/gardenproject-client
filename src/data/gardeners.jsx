const API_URL = 'http://localhost:8000';

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