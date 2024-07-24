const API_URL = 'http://localhost:8000';

export const getPosts = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(`${API_URL}/posts`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};