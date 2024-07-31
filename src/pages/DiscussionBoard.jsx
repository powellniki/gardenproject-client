import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getPostByTopicId } from "../data/posts.jsx"
import { PostListObject } from "../components/PostListObject.jsx"
import backgroundImage from '../assets/greenhouse.jpg'
import { getTopicByTopicId } from "../data/topics.jsx"


export const DiscussionBoard = () => {
    const [posts, setPosts] = useState([])
    const [topic, setTopic] = useState("")
    // const location = useLocation();
    // const { topicName } = location.state || {};

    const { topicId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostByTopicId(topicId).then(postData => {
            setPosts(postData)
        })
        getTopicByTopicId(topicId).then(topicData => {
            setTopic(topicData)
        })
    }, [])

    return (
        <div className="">
            <div
                className="relative flex flex-col items-center justify-center text-white"
                style={{
                    height: '4in',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
            }}>
                <div className="font-arsenal text-6xl">{topic.name}</div>
                <button 
                    className="text-white text-sm mt-4 px-8 py-2 border hover:bg-opacity-70 hover:bg-green-950 hover:border-transparent transition duration-300"
                    onClick={() => {navigate('/posts/new')}}>
                START A CONVERSATION
                </button>
            </div>
            <section className="p-8 mb-4">

                <div className="space-y-4 mt-8">
                    {posts.map(post => {
                        return <PostListObject post={post} key={post.id}/>
                    })}
                </div>

            </section>
        </div>
    )
}