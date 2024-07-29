const API_URL = 'http://localhost:8000';


export const getImagesByPostId = async (postId) => {
    const url = `${API_URL}/images?post=${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}


export const deleteImage = async (imageId) => {
    const url = `${API_URL}/images/${imageId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
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