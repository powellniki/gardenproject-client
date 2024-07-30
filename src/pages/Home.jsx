import { useEffect, useState } from "react"
import { getPosts } from "../data/posts.jsx"
import { getTopics } from "../data/topics.jsx"
import { PostListObject } from "../components/PostListObject.jsx"
import { Filter } from "../components/Filter.jsx"
import { Link, useNavigate } from "react-router-dom"
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
                height: '8.5in',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
        }}>
            <div className="font-arsenal text-8xl">welcome to the Society</div>
            <button 
                className="text-white text-sm mt-4 px-8 py-2 border hover:bg-opacity-70 hover:bg-green-950 hover:border-transparent transition duration-300"
                onClick={() => {navigate('/posts/new')}}>
            START A DISCUSSION
            </button>
        </div>

        <div className="flex justify-end p-4 pt-4">
        </div>

        <div className="flex flex-row p-4">
            <div className="w-1/5 p-4 mt-4 bg-green-950 shadow self-start">
                <h3 className="font-arsenal text-2xl text-white mb-2">discussion Board Topics</h3>
                {topics.map(topic => {
                    return <Link to={`/discussion/topics/${topic.id}`} key={topic.id} ><div className="mb-2 p-1 text-sm text-white" key={topic.name}>{topic.name}</div></Link>
                })}
            </div>
            <div className="w-4/5 p-4">
                <div className="mb-4 flex justify-between">
                    <h2 className="font-arsenal text-3xl pl-4 text-green-900">all Posts</h2>
                    <Filter onFilterChange={handleFilterChange}/>
                </div>
                {posts.map(post => {
                    return <PostListObject post={post} key={post.id}/>
                })}
            </div>
        </div>
      </main>
    )
  }
  
  export default Home
  