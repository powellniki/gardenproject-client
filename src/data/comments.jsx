const API_URL = 'http://localhost:8000';

export const getCommentsByPostId = async (postId) => {
    const url = `${API_URL}/comments?post=${postId}`
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


export const createComment = async (comment) => {
    const url = `${API_URL}/comments`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(comment)
        });
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create comment');
        }
    } catch (error) {
        console.error("Failed to submit comment:", error);
        throw error;
    }
}