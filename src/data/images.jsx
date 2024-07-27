const API_URL = 'http://localhost:8000';


export const getImagesByPostId = async (postId) => {
    const url = `${API_URL}/images?post=${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
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