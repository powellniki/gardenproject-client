import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostByPostId } from "../data/posts.jsx"
import { getCommentsByPostId } from "../data/comments.jsx"

export const PostDetails = ({currentUser}) => {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [input, setInput] = useState("")
    
    const { postId } = useParams()


    const getPost = () => {
        getPostByPostId(postId).then(postData => {
            setPost(postData)
        })
    }
    const getComments = () => {
        getCommentsByPostId(postId).then(commentData => {
            setComments(commentData)
        })
    }

    useEffect(() => {
        getPost() 
        getComments()
    },[postId])



    return (
        <section className="border border-gray-300 rounded-lg p-12 m-4 bg-white shadow">
            <h1 className="text-4xl font-semibold mb-8">{post.title}</h1>
            <div className="text-sm text-gray-500 flex justify-between mb-4">
                <h3 className="text-lg">@{post.gardener?.username}</h3>
                <p>{new Date(post.created_date).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700">{post.description}</p>
            </div>
            <div>
                {post.topics?.map(topic => {
                    return <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-8" key={topic.id}>{topic.name}</span>
                })}
            </div>
            <div>
                {currentUser.id === post.gardener?.userId ? <div className="flex space-x-4 mb-8">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">EDIT</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">DELETE</button>
                    </div> : "" }
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Comments:</h3>
                {comments.map(comment => {
                    return (
                        <div className="mb-4 border-t border-gray-200 pt-2" key={comment.id}>
                            <p className="text-sm font-semibold text-gray-600">@{comment.gardener?.username}</p>
                            <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                            <p className="text-gray-700">{comment.comment}</p>
                        </div>
                    )
                })}
                <div className="mt-4">
                    <input className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="Add a comment..."/>
                    <div className="flex justify-end">
                        <button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">
                            + COMMENT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}