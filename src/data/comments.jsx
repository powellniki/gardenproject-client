const API_URL = 'https://gardenapi-app-8s8tg.ondigitalocean.app';

export const getCommentsByPostId = async (postId) => {
    const url = `${API_URL}/comments?post=${postId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
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
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
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


export const editComment = async (updatedComment) => {
    const url = `${API_URL}/comments/${updatedComment.id}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
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
            throw Error(error.message);
          }
    }
}


export const deleteComment = async (commentId) => {
    const url = `${API_URL}/comments/${commentId}`
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
            throw Error(error.message);
          }
    }
}