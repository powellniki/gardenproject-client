import { useState } from "react"




function Home() {
    const [posts, setPosts] = useState('')
    const [topics, setTopics] = useState('')

    return (
      <main className='text-slate-900'>
        <h1 className='text-4xl'>Welcome to Rooted</h1>
        <h3 className='text-2xl'>The Virtual Garden Club</h3>
      </main>
    )
  }
  
  export default Home
  