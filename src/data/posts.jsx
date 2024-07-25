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


export const getPostByTopicId = async (topicId) => {
    const url = `${API_URL}/posts?topic=${topicId}`
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


export const createPost = async (newPost) => {
    const url = `${API_URL}/posts`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(newPost)
        });
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create post');
        }
    } catch (error) {
        console.error("Failed to submit post:", error);
        throw error;
    }
}


export const editPost = async (post, postId) => {
    const url = `${API_URL}/posts/${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(post)
        });
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to edit post');
        }
    } catch (error) {
        console.error("Failed to submit edited post:", error);
        throw error;
    }
}