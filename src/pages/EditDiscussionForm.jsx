import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editPost, getPostByPostId } from "../data/posts.jsx";
import { getTopics } from "../data/topics.jsx";
import { deleteImage } from "../data/images.jsx";


export const EditDiscussionForm = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [post, setPost] = useState({})
    const [topics, setTopics] = useState([])
    const [selectedTopics, setSelectedTopics] = useState([])
    const [titleInput, setTitleInput] = useState("")
    const [contentInput, setContentInput] = useState("")
    const [currentImages, setCurrentImages] = useState([])
    const [newImages, setNewImages] = useState([])
    const [update, setUpdate] = useState(false)
    const { postId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const localUser = localStorage.getItem("garden_token")
        const localUserObject = JSON.parse(localUser)
        setCurrentUser(localUserObject)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const postDetails = await getPostByPostId(postId)
            const allTopics = await getTopics()
            setPost(postDetails)
            setTitleInput(postDetails.title)
            setContentInput(postDetails.description)
            setSelectedTopics(postDetails.topics || [])
            setCurrentImages(postDetails.images || [])
            setTopics(allTopics)
        };
        fetchData()
    }, [postId, update])

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
        setNewImages([...e.target.files])
    }

    const handleRemoveCurrentImage = (imageId) => {
        deleteImage(imageId)
            .then(() => {
                setUpdate(!update) 
            })
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
        currentImages.forEach(image => {
            // Append existing images as they are or by referencing their IDs
            formData.append('image_path', image.id)
        })
        newImages.forEach(image => {
            formData.append('image_path', image)
        })
        console.log("Form Data:", formData);  // Log FormData entries
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1])
        }

        editPost(formData, postId).then(() => {
            navigate(`/posts/${postId}`)
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
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Current Images:</label>
                    <div className="flex space-x-2 mb-4">
                        {currentImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.image_url} alt={`img-${index}`} className="w-20 h-20 object-cover rounded" />
                                <button type="button" onClick={() => handleRemoveCurrentImage(image.id)} className="text-red-500">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Add New Images:</label>
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