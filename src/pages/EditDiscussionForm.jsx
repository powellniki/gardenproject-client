import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editPost, getPostByPostId } from "../data/posts.jsx";
import { getTopics } from "../data/topics.jsx";


export const EditDiscussionForm = ({currentUser}) => {
    const [post, setPost] = useState({})
    const [topics, setTopics] = useState([])
    const [selectedTopics, setSelectedTopics] = useState([])
    const [titleInput, setTitleInput] = useState("")
    const [contentInput, setContentInput] = useState("")

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const postDetails = await getPostByPostId(postId)
            const allTopics = await getTopics()
            setPost(postDetails)
            setTitleInput(postDetails.title)
            setContentInput(postDetails.description)
            setSelectedTopics(postDetails.topics)
            setTopics(allTopics)
        };
        fetchData()
    }, [postId])

    const handleTopicSelect = (e) => {
        const topicId = e.target.value;
        const topic = topics.find(t => t.id.toString() === topicId)
        if (topic && !selectedTopics.some(t => t.id === topic.id)) {
            setSelectedTopics(prevTopics => [...prevTopics, topic])
        }
    }

    const removeTopic = (topicId) => {
        setSelectedTopics(prevTopics => prevTopics.filter(t => t.id !== topicId))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) {
            console.error("Current user is not defined!")
            return
        }

        const updatedPost = {
            id: postId,
            title: titleInput,
            description: contentInput,
            gardener: currentUser.id,
            posttopics: selectedTopics.map(t => t.id)
        }

        editPost(updatedPost).then(() => {
            navigate('/')
        })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-4xl font-semibold mb-6">Edit Discussion</h1>

            <fieldset>
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">Content:</label>
                    <textarea
                        type="text"
                        id="content"
                        name="description"
                        value={contentInput}
                        onChange={e => setContentInput(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded h-52"
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="topics" className="block text-lg font-medium text-gray-700 mb-2">Topics:</label>
                <select id="topics" onChange={handleTopicSelect} className="w-full p-2 border border-gray-300 rounded mb-4">
                    <option value="0" id="topic">Add a Topic...</option>
                    {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                    ))}
                </select>
                <div>
                    {selectedTopics.map(topic => (
                        <span key={topic.id} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                            <button type="button" onClick={() => removeTopic(topic.id)}>
                                x {topic.name}
                            </button>
                        </span>
                    ))}
                </div>
            </fieldset>

        <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">Save Changes</button>
    </form>
    )
}