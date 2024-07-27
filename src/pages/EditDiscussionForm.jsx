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
    const [newImages, setNewImages] = useState([])

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

    const handleImageChange = (e) => {
        setNewImages(e.target.files)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) {
            console.error("Current user is not defined!")
            return
        }

        const formData = new FormData()
        formData.append('title', titleInput)
        formData.append('description', contentInput)
        formData.append('gardener', currentUser.id)
        selectedTopics.forEach(topic => {
            formData.append('posttopics', topic.id)
        })
        Array.from(newImages).forEach(image => {
            formData.append('image_path', image)
        })
        console.log("Form Data:", formData);  // Log FormData entries
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        editPost(formData, postId).then(() => {
            navigate('/')
        }).catch(err => console.error("Failed to create post:", err))
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

            <fieldset>
                <div>
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Images:</label>
                    <input
                        type="file"
                        id="image"
                        name="images"
                        multiple
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleImageChange}
                    />
                </div>
            </fieldset>

        <div className="flex justify-end mt-4">
            <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">
            Fertilize Changes
            </button>
        </div>
    </form>
    )
}