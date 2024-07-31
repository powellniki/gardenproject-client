const API_URL = 'http://localhost:8000';

export const getTopics = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(`${API_URL}/topics`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch topics');
        }

        const topics = await response.json();
        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
}


export const getTopicByTopicId = async (topicId) => {
    const url = `${API_URL}/topics/${topicId}`
    try {
        const token = JSON.parse(localStorage.getItem("garden_token")).token;
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch topic');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching topic:", error);
        throw error;
    }
}