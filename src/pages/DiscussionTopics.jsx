import { useEffect, useState } from "react"
import { getTopics } from "../data/topics.jsx"
import { Link } from "react-router-dom"

export const DiscussionTopics = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics().then(topicData =>{
            setTopics(topicData)
        }) 
    }, [])


    return (
        <section className="p-4">
            <h1 className="text-4xl font-semibold mb-8">Discussion Topics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topics.map(topic => {
                    return <Link to={`/discussion/topics/${topic.id}`} key={topic.id} className="flex justify-center items-center bg-gray-100 p-4 rounded shadow hover:bg-gray-200 transition duration-300">
                            {topic.name}
                        </Link>
                })}
            </div>
        </section>
    )
}