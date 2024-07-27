import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostByPostId } from "../data/posts.jsx"
import { createComment, deleteComment, getCommentsByPostId } from "../data/comments.jsx"
import { getImagesByPostId } from "../data/images.jsx"

export const PostDetails = ({currentUser}) => {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [input, setInput] = useState("")
    const [update, setUpdate] = useState(false)
    const [postImages, setPostImages] = useState([])
    
    const { postId } = useParams()
    const navigate = useNavigate()


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

    const getImages = () => {
        getImagesByPostId(postId).then(postData => {
            setPostImages(postData)
        })
    }

    useEffect(() => {
        getPost() 
        getComments()
        getImages()
    },[postId, update])


    const handleDeletePost = (postId) => {
        deletePost(postId).then(() => {
            navigate('/')
        })
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) {
            console.error("Current user is not defined")
            return}

        const newComment = {
            comment: input,
            gardener: currentUser.id,
            post_id: postId}

        createComment(newComment)
            .then(() => {
                setInput(""),
                setUpdate(!update) 
            })
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId).then(() => {
            setUpdate(!update) 
        })
    }


    return (
        <section className="border border-gray-300 rounded-lg p-12 m-4 bg-white shadow">
            <h1 className="text-5xl font-semibold mb-8">{post.title}</h1>
            <div className="text-sm text-gray-500 flex justify-between mb-4">
                <h3 className="text-lg">@{post.gardener?.username}</h3>
                <p>{new Date(post.created_date).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center">
                {post.images?.map(image => {
                    return <img key={image.id} src={image.image_url} alt="Image"/>
                })}
            </div>
            <div className="mb-4 mt-8">
                <p className="text-gray-700">{post.description}</p>
            </div>
            <div>
                {post.topics?.map(topic => {
                    return <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-8" key={topic.id}>{topic.name}</span>
                })}
            </div>
            <div>
                {currentUser.id === post.gardener?.userId ? <div className="flex justify-end space-x-1 mb-4">
                    <Link to={`/posts/${post.id}/edit`}>
                        <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-20">EDIT</button>
                    </Link>
                    <button onClick={() => {handleDeletePost(post.id)}} className="bg-red-500 text-white text-xs px-4 py-2 rounded hover:bg-red-600 transition duration-300">DELETE</button>
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
                            {currentUser.id === comment.gardener?.userId ? <div className="flex justify-end space-x-1">
                                {/* <button className="bg-gray-200 text-black text-xs px-2 py-1 rounded hover:bg-gray-400 transition duration-300">EDIT</button> */}
                                <button onClick={() => {handleDeleteComment(comment.id)}} className="bg-gray-200 text-black text-xs px-2 py-1 rounded hover:bg-gray-400 transition duration-300">DELETE</button>
                            </div> : "" }
                        </div>
                    )
                })}
                <div className="mt-4">
                    <textarea type="text" id="comment" name="comment" value={input} onChange={e => setInput(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="Add a comment..."></textarea>
                    <div className="flex justify-end">
                        <button onClick={handleSubmitComment} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">
                            + COMMENT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}