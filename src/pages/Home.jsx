import { useEffect, useState } from "react"
import { getPosts } from "../data/posts.jsx"
import { getTopics } from "../data/topics.jsx"
import { Link } from "react-router-dom"
import { PostListObject } from "../components/PostListObject.jsx"
import { Filter } from "../components/Filter.jsx"




function Home() {
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])

    const fetchFilteredPosts = (filter) => {
        getPosts(filter).then(setPosts).catch(error => console.error('Failed to load posts', error));
    }

    useEffect(() => {
        fetchFilteredPosts('');
        getTopics()
            .then(setTopics)
            .catch(error => console.error('Failed to load topics', error));
    }, []);

    const handleFilterChange = (event) => {
        fetchFilteredPosts(event.target.value);
    };

    return (
      <main className='text-slate-900 p-4'>
        {/* <img src=""/> */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <Filter onFilterChange={handleFilterChange}/>
            <button className="bg-amber-500 text-white px-8 py-2 mr-4 rounded hover:bg-amber-600 transition duration-300">
            START A DISCUSSION
            </button>
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
  