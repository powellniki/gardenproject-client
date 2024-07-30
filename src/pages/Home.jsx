import { useEffect, useState } from "react"
import { getPosts } from "../data/posts.jsx"
import { getTopics } from "../data/topics.jsx"
import { PostListObject } from "../components/PostListObject.jsx"
import { Filter } from "../components/Filter.jsx"
import { useNavigate } from "react-router-dom"




function Home() {
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    

    const fetchFilteredPosts = (filter) => {
        getPosts(filter).then(setPosts).catch(error => console.error('Failed to load posts', error));
    }

    useEffect(() => {
        fetchFilteredPosts('')
        getTopics()
            .then(setTopics)
            .catch(error => console.error('Failed to load topics', error));
    }, []);

    const handleFilterChange = (event) => {
        fetchFilteredPosts(event.target.value);
    };

    return (
      <main className='text-slate-900 p-8'>
        <div className="flex justify-between items-center">
            <h1 className="text-8xl font-handwriting text-green-900 pl-28 pb-8"></h1>
            <div className="flex-1"></div>
            <div className="mt-20">
                <Filter onFilterChange={handleFilterChange}/>
                <button 
                    className="bg-green-700 text-white px-2 py-1 mr-4 rounded hover:bg-green-800 transition duration-300"
                    onClick={() => {navigate('/posts/new')}}>
                SPROUT A CONVERSATION
                </button>
            </div>
        </div>
        <div className="flex flex-row">
            <div className="w-1/5 p-4 mt-4 bg-gray-100 rounded-lg shadow self-start">
                <h3 className="text-xl mb-4">Discussion Board Topics</h3>
                {topics.map(topic => {
                    return <div className="mb-2 p-1 text-sm" key={topic.name}>{topic.name}</div>
                })}
            </div>
            <div className="w-4/5 p-4">
                {posts.map(post => {
                    return <PostListObject post={post} key={post.id}/>
                })}
            </div>
        </div>
      </main>
    )
  }
  
  export default Home
  