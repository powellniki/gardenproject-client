import { Link } from "react-router-dom"


export const PostListObject = ({post}) => {


    return (
        <Link to={`/posts/${post.id}`}>
            <section className="border border-gray-300 rounded p-4 mb-4 bg-white hover:bg-gray-50 transition duration-300">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <div className="text-sm text-gray-500 flex justify-between mb-2">
                        <span className="">Posted By: {post.gardener?.username}</span>
                        <span className="">{new Date(post.created_date).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 truncate-multiline">{post.description}</p>
                    </div>
                    <div className="mb-4">
                        {post.topics.map(topic=> {
                            return <span className="inline-block bg-green-900 bg-opacity-10 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2" key={topic.id}>{topic.name}</span>
                        })}
                    </div>
                    <div className="text-sm text-gray-600">
                        {post.comment_count === 1 ? <p>{post.comment_count} comment</p> : <p>{post.comment_count} comments</p>}
                        
                    </div>
                </div>
            </section>
        </Link>
    )
}