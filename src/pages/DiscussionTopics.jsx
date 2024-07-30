import { useEffect, useState } from "react"
import { getTopics } from "../data/topics.jsx"
import { Link, useNavigate } from "react-router-dom"
import backgroundImage from '../assets/greenhouse.jpg'

export const DiscussionTopics = () => {
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getTopics().then(topicData =>{
            setTopics(topicData)
        }) 
    }, [])


    return (
        <section className="">
            <div
                className="relative flex flex-col items-center justify-center text-white"
                style={{
                    height: '3in',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
            }}>
                <div className="font-arsenal text-6xl">discussion Boards</div>
                <button 
                    className="text-white text-sm mt-4 px-8 py-2 border hover:bg-opacity-70 hover:bg-green-950 hover:border-transparent transition duration-300"
                    onClick={() => {navigate('/posts/new')}}>
                START A CONVERSATION
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-4">
                {topics.map(topic => {
                    return <Link 
                                to={`/discussion/topics/${topic.id}`} 
                                key={topic.id} 
                                state={{ topicName: topic.name }}
                                className="flex justify-center items-center bg-gray-100 p-4 shadow hover:bg-gray-200 transition duration-300">
                            {topic.name}
                        </Link>
                })}
            </div>
        </section>
    )
}