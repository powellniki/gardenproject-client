const API_URL = 'http://localhost:8000';


export const getPosts = async (filter = '') => {
    const url = `${API_URL}/posts${filter ? `?filter=${filter}` : ''}`;
        try {
            const token = JSON.parse(localStorage.getItem("token")).token;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
}


export const getPostByPostId = async (postId) => {
    const url = `${API_URL}/posts/${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}