import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopics } from "../data/topics.jsx"


export const NewDiscussionForm = ({currentUser}) => {
    const [topics, setTopics] = useState([])
    const [titleInput, setTitleInput] = useState("")
    const [contentInput, setContentInput] = useState("")
    const [selectedTopics, setSelectedTopics] = useState([])
    const [imageInput, setImageInput] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getTopics().then(topicData => {
            setTopics(topicData)
        }) 
    }, [])

    const handleTopicSelect = (e) => {
        const topicId = e.target.value;
        const topic = topics.find(t => t.id.toString() === topicId);
        if (topic && !selectedTopics.includes(topic)) {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const removeTopic = (topicId) => {
        setSelectedTopics(selectedTopics.filter(t => t.id !== topicId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit the form
    };

    return (
        <form>
            <h1>Start a New Discussion</h1>
            <div>

                <fieldset>
                    <div>
                        <h4>Title:</h4>
                        <input id="title" value={titleInput} onChange={e => setTitleInput(e.target.value)}></input>
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <h4>Content:</h4>
                        <textarea id="content" value={contentInput} onChange={e => setContentInput(e.target.value)}></textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <h4>Topics:</h4>
                    <select id="topics" onChange={handleTopicSelect}>
                        <option value="0" id="topic">Add a Topic...</option>
                            {topics.map(topic => {
                                return <option key={topic.id} value={topic.id}>{topic.name}</option>
                            })}
                    </select>
                    <div>
                        {selectedTopics.map(topic => {
                            return (
                                <span key={topic.id} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    <button>x {topic.name}</button>
                                </span>
                            )
                        })}
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <h4>Images:</h4>
                        <input></input>
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <button>Submit</button>
                    </div>
                </fieldset>

            </div>
        </form>
    )
}