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
        <form onSubmit={handleSubmit}>
        <h1>Edit Discussion</h1>

        <fieldset>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)}
                    required
                />
            </div>
        </fieldset>

        <fieldset>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={contentInput}
                    onChange={e => setContentInput(e.target.value)}
                    required
                />
            </div>
        </fieldset>

        <fieldset>
            <label>Topics:</label>
            <select id="topics" onChange={handleTopicSelect} value="0">
                <option disabled value="0">Add a Topic...</option>
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

        <button type="submit">Save Changes</button>
    </form>
    )
}