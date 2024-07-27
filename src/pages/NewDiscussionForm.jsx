import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopics } from "../data/topics.jsx"
import { createPost } from "../data/posts.jsx"


export const NewDiscussionForm = ({currentUser}) => {
    const [topics, setTopics] = useState([])
    const [titleInput, setTitleInput] = useState("")
    const [contentInput, setContentInput] = useState("")
    const [selectedTopics, setSelectedTopics] = useState([])
    const [imageInput, setImageInput] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getTopics().then(topicData => {
            setTopics(topicData)
        })
    }, [])

    const handleTopicSelect = (e) => {
        const topicId = e.target.value
        const topic = topics.find(t => t.id.toString() === topicId)
        if (topic && !selectedTopics.includes(topic)) {
            setSelectedTopics([...selectedTopics, topic])
        }
    };

    const removeTopic = (topicId) => {
        setSelectedTopics(selectedTopics.filter(t => t.id !== topicId))
    };

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
        if (imageInput) {
            formData.append('image_path', imageInput)
        }
        console.log("Form Data:", formData);  // Log FormData entries
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        createPost(formData).then(() => {
            navigate('/')
        }).catch(err => console.error("Failed to create post:", err))
    }

    return (
        <form method="post" encType="multipart/form-data" className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-4xl font-semibold mb-6">Start a New Discussion</h1>
            <div className="space-y-6">

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
                            placeholder="Write your post here..." 
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
                            {topics.map(topic => {
                                return <option key={topic.id} value={topic.id}>{topic.name}</option>
                            })}
                    </select>
                    <div>
                        {selectedTopics.map(topic => {
                            return (
                                <span key={topic.id} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    <button type="button" onClick={() => {removeTopic(topic.id)}}>x {topic.name}</button>
                                </span>
                            )
                        })}
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Image: </label>
                        <input
                            type="file"
                            id="image"
                            name="images"
                            multiple
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={e => setImageInput(e.target.files[0])}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={handleSubmit}
                            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">
                            Plant It
                        </button>
                    </div>
                </fieldset>

            </div>
        </form>
    )
}