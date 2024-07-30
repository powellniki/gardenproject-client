import { useEffect, useState } from "react"
import { getPosts } from "../data/posts.jsx"
import { getTopics } from "../data/topics.jsx"
import { PostListObject } from "../components/PostListObject.jsx"
import { Filter } from "../components/Filter.jsx"
import { useNavigate } from "react-router-dom"
import backgroundImage from '../assets/greenhouse.jpg'




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
      <main className='text-slate-900'>
        <div
            className="relative flex flex-col items-center justify-center text-white"
            style={{
                height: '3.5in',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
        }}>
            <div className="font-arsenal text-8xl">welcome to the Society</div>
            <button 
                className="text-white text-xs mt-4 px-8 py-2 border hover:bg-green-900 hover:border-green-900 transition duration-300"
                onClick={() => {navigate('/posts/new')}}>
            START A DISCUSSION
            </button>
        </div>

        <div className="flex justify-end">
            <Filter onFilterChange={handleFilterChange}/>
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
  