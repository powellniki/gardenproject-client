import { useEffect, useState } from "react"
import { getPosts } from "../data/posts.jsx"
import { getTopics } from "../data/topics.jsx"
import { Link } from "react-router-dom"
import { PostListObject } from "../components/PostListObject.jsx"




function Home() {
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])


    useEffect(() => {
        Promise.all([getPosts(), getTopics()])
            .then(([postsData, topicsData]) => {
                setPosts(postsData);
                setTopics(topicsData);
            })
            .catch(error => {
                console.error('Failed to load data', error);
                // Handle any error that occurs during any request
            });
    }, []);


    return (
      <main className='text-slate-900 p-4'>
        <h1 className='text-4xl mb-4'>Welcome to Rooted</h1>
        <h3 className='text-2xl mb-6'>The Virtual Garden Club</h3>
        <div className="flex flex-row">
            <div className="w-1/5 p-4 bg-gray-100">
                <h3 className="text-xl mb-4">Discussion Board Topics</h3>
                {topics.map(topic => {
                    return <div className="mb-2" key={topic.name}>{topic.name}</div>
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
  