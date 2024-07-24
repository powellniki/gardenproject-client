import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getPostByTopicId } from "../data/posts.jsx"
import { PostListObject } from "../components/PostListObject.jsx"


export const DiscussionBoard = () => {
    const [posts, setPosts] = useState([])
    const location = useLocation();
    const { topicName } = location.state || {};
    const { topicId } = useParams()

    useEffect(() => {
        getPostByTopicId(topicId).then(postData => {
            setPosts(postData)
        }) 
    }, [])

    return (
        <section className="border border-gray-300 rounded-lg p-4 mb-4">
            <h1 className="text-4xl font-semibold mb-4">{topicName}</h1>
            <div className="space-y-4">
                {posts.map(post => {
                    return <PostListObject post={post} key={post.id}/>
                })}
            </div>
        </section>
    )
}