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


export const createPost = async (formData) => {
    const url = `${API_URL}/posts`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: formData
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


export const editPost = async (updatedPost) => {
    const url = `${API_URL}/posts/${updatedPost.id}`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(updatedPost)
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


export const deletePost = async (postId) => {
    const url = `${API_URL}/posts/${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
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