import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getPostByTopicId } from "../data/posts.jsx"
import { PostListObject } from "../components/PostListObject.jsx"


export const DiscussionBoard = () => {
    const [posts, setPosts] = useState([])
    const location = useLocation();
    const { topicName } = location.state || {};

    const { topicId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostByTopicId(topicId).then(postData => {
            setPosts(postData)
        }) 
    }, [])

    return (
        <div className="pl-4 pr-6">
            <section className="p-4 mb-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-arsenal text-green-100 mb-4 mt-20 pl-20">{topicName}</h1>
                    <div className="flex justify-end mb-4 mt-20">
                        <button 
                            className="bg-amber-500 text-white px-8 py-2 mr-4 rounded hover:bg-amber-600 transition duration-300"
                            onClick={() => {navigate('/posts/new')}}>
                            SPROUT A CONVERSATION
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {posts.map(post => {
                        return <PostListObject post={post} key={post.id}/>
                    })}
                </div>

            </section>
        </div>
    )
}